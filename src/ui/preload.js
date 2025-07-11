import { contextBridge, ipcRenderer } from "electron";
import { TASK_EVENTS } from "../commons/events";

contextBridge.exposeInMainWorld("taskAPI", {
  createTask: ({ task }) => ipcRenderer.send(TASK_EVENTS.CREATE, task),
});

export { createTask }
