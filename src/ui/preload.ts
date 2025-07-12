import { contextBridge, ipcRenderer } from "electron";
import { TASK_EVENTS } from "../commons/events";
import { TaskDTO } from "../commons/models";

export type TaskApi = {
    createTask: (task: TaskDTO) => void;
};

const taskAPI: TaskApi = {
    createTask: (task) => ipcRenderer.send(TASK_EVENTS.CREATE, task),
}


contextBridge.exposeInMainWorld("taskAPI", taskAPI);

