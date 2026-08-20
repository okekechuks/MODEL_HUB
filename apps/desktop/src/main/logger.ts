import type { LogLevel } from "@model-hub/shared-types";

export function log(level: LogLevel, message: string, context: Record<string, unknown> = {}): void {
  const prefix = `[model-hub][${level}]`;
  const payload = Object.keys(context).length > 0 ? context : "";
  const write = level === "error" ? console.error : level === "warn" ? console.warn : console.info;
  write(prefix, message, payload);
}
