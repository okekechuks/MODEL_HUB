import type { DesktopApi } from "@model-hub/shared-types";

declare global {
  interface Window {
    modelHub?: DesktopApi;
  }
}

export {};
