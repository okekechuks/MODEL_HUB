import { contextBridge, ipcRenderer } from "electron";

import type { DesktopApi } from "@model-hub/shared-types";

const api: DesktopApi = {
  getAppVersion: () => ipcRenderer.invoke("app:get-version") as Promise<string>,
};

contextBridge.exposeInMainWorld("modelHub", api);
