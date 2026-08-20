export type AIProviderId =
  | "openai"
  | "anthropic"
  | "google"
  | "deepseek"
  | "openrouter"
  | "ollama"
  | "openai-compatible";

export type ConversationMode = "normal" | "brainstorm";
export type TurnOrderMode = "ranked" | "random";

export interface ModelInfo {
  id: string;
  provider: AIProviderId;
  name: string;
  capabilities: string[];
}

export interface DesktopApi {
  getAppVersion(): Promise<string>;
}

export interface RoomModelSelection {
  modelConnectionId: string;
  active: boolean;
  position: number;
  role?: string;
}

export interface RoomSettings {
  conversationMode: ConversationMode;
  turnOrderMode: TurnOrderMode;
}
