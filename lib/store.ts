import { Redis } from "@upstash/redis";
import type { NameResult } from "@/lib/types";

const memory = new Map<string, { value: string; expiresAt: number }>();

function redisClient(): Redis | null {
  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    return null;
  }
  return Redis.fromEnv();
}

function pruneMemory() {
  const now = Date.now();
  for (const [key, item] of memory) {
    if (item.expiresAt <= now) memory.delete(key);
  }
}

async function read(key: string): Promise<string | null> {
  const redis = redisClient();
  if (redis) return redis.get<string>(key);
  pruneMemory();
  return memory.get(key)?.value ?? null;
}

async function write(
  key: string,
  value: string,
  ttlSeconds: number,
): Promise<void> {
  const redis = redisClient();
  if (redis) {
    await redis.set(key, value, { ex: ttlSeconds });
    return;
  }
  memory.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 });
}

export function hasPersistentStore(): boolean {
  return redisClient() !== null;
}

export async function consumeOnce(key: string, ttlSeconds: number) {
  const redis = redisClient();
  if (redis) {
    const result = await redis.set(key, "1", { nx: true, ex: ttlSeconds });
    return result === "OK";
  }
  pruneMemory();
  if (memory.has(key)) return false;
  memory.set(key, { value: "1", expiresAt: Date.now() + ttlSeconds * 1000 });
  return true;
}

export async function acquireLock(key: string, ttlSeconds: number) {
  return consumeOnce(`lock:${key}`, ttlSeconds);
}

export async function releaseLock(key: string) {
  const redis = redisClient();
  if (redis) {
    await redis.del(`lock:${key}`);
    return;
  }
  memory.delete(`lock:${key}`);
}

export async function getCount(key: string): Promise<number> {
  return Number((await read(`count:${key}`)) ?? 0);
}

export async function incrementCount(
  key: string,
  ttlSeconds: number,
): Promise<number> {
  const redis = redisClient();
  if (redis) {
    const count = await redis.incr(`count:${key}`);
    if (count === 1) await redis.expire(`count:${key}`, ttlSeconds);
    return count;
  }
  const current = await getCount(key);
  await write(`count:${key}`, String(current + 1), ttlSeconds);
  return current + 1;
}

export async function getCachedResult(
  profileKey: string,
): Promise<NameResult | null> {
  const value = await read(`cache:${profileKey}`);
  if (!value) return null;
  try {
    return JSON.parse(value) as NameResult;
  } catch {
    return null;
  }
}

export async function saveResult(
  result: NameResult,
  profileKey: string,
): Promise<void> {
  const ttl = 60 * 60 * 24 * 30;
  const serialized = JSON.stringify(result);
  await Promise.all([
    write(`result:${result.id}`, serialized, ttl),
    write(`cache:${profileKey}`, serialized, ttl),
  ]);
}

export async function getResult(id: string): Promise<NameResult | null> {
  if (!/^[a-f0-9-]{36}$/i.test(id)) return null;
  const value = await read(`result:${id}`);
  if (!value) return null;
  try {
    return JSON.parse(value) as NameResult;
  } catch {
    return null;
  }
}
