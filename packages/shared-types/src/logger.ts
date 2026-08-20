export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogEvent {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, string | number | boolean | null>;
}
