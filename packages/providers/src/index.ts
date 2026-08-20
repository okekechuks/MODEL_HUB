import type { AIProviderId, ModelInfo } from "@model-hub/shared-types";

export interface GenerateRequest {
  model: string;
  messages: Array<{ role: "system" | "user" | "assistant"; content: string }>;
  temperature?: number;
  maxTokens?: number;
}

export interface GenerateResult {
  content: string;
  model: string;
  usage?: {
    inputTokens?: number;
    outputTokens?: number;
  };
}

export interface ModelProvider {
  readonly id: AIProviderId;
  listModels(): Promise<ModelInfo[]>;
  generate(request: GenerateRequest): Promise<GenerateResult>;
}

export class UnsupportedProviderError extends Error {
  constructor(provider: AIProviderId) {
    super(`Provider ${provider} is not implemented yet.`);
    this.name = "UnsupportedProviderError";
  }
}

export function createProviderRegistry(providers: ModelProvider[]): ReadonlyMap<AIProviderId, ModelProvider> {
  return new Map(providers.map((provider) => [provider.id, provider]));
}
