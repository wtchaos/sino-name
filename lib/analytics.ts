"use client";

type GeneratorEvent =
  | "generator_open"
  | "generator_step_view"
  | "generator_step_complete"
  | "generator_submit"
  | "generator_success"
  | "generator_error";

// Queue before the GA script loads so an early page/step view is not lost.
// Only fixed event names and step numbers belong here, never profile values.
export function trackGeneratorEvent(
  event: GeneratorEvent,
  parameters: { step_number?: number } = {},
) {
  if (process.env.NODE_ENV !== "production" || typeof window === "undefined") return;
  const analyticsWindow = window as Window & { dataLayer?: unknown[] };
  analyticsWindow.dataLayer ??= [];
  function enqueue(..._args: unknown[]) {
    analyticsWindow.dataLayer!.push(arguments);
  }
  enqueue("event", event, { ...parameters, funnel_name: "name_generator" });
}
