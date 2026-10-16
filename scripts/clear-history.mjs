import { spawn } from "node:child_process";

if (process.env.NODE_ENV === "production") {
  console.error("History clearing is only available during development.");
  process.exit(1);
}

const target = new URL(process.argv[2] ?? "http://localhost:3000");
if (!['http:', 'https:'].includes(target.protocol) ||
    !['localhost', '127.0.0.1', '[::1]'].includes(target.hostname)) {
  console.error("Use a local development URL, such as http://localhost:3001.");
  process.exit(1);
}
target.pathname = "/dev/clear";
target.search = "";
target.hash = "";
const url = target.toString();
console.log(`Opening ${url}`);
console.log("The development server must be running. History is cleared in the browser that opens this URL.");
console.log("If you use another browser or profile, open this URL there instead.");
const command = process.platform === "darwin" ? "open" : process.platform === "win32" ? "explorer.exe" : "xdg-open";
const child = spawn(command, [url], { stdio: "ignore" });
child.on("error", () => {
  console.error(`Could not open a browser. Open ${url} manually.`);
  process.exitCode = 1;
});
child.on("exit", (code) => {
  if (code) {
    console.error(`Could not open a browser. Open ${url} manually.`);
    process.exitCode = 1;
  }
});
