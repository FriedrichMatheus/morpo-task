import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";
import { TaskDTO } from "../commons/models";
import { WindowsCommons, EventsCommons } from "../commons";

const { WINDOW_EVENTS } = WindowsCommons;
const { TASK_EVENTS } = EventsCommons;

type TaskApi = {
    createTask: (task: TaskDTO) => void;
    deleteTask: (id: number) => void;
    receiveTasks: (
        handler: (event: IpcRendererEvent, tasks: TaskDTO[]) => void,
    ) => void;
    getAllTask: () => void;
};

const taskAPI: TaskApi = {
    getAllTask: () => ipcRenderer.send(TASK_EVENTS.GET_ALL),
    createTask: (task) => ipcRenderer.send(TASK_EVENTS.CREATE, task),
    deleteTask: (id) => ipcRenderer.send(TASK_EVENTS.DELETE, { id }),
    receiveTasks: (handler) => ipcRenderer.on(TASK_EVENTS.SEND_ALL, handler),
};

type WindowApi = {
    openWindow: ({ type, args }: { type: string; args: any }) => void;
    closeWindowById: (id: string) => void;
    minimizeWindowById: (id: string) => void;
    resizeWindowById: (id: string) => void;
    fullscreenWindowById: (id: string) => void;
};

const windowAPI: WindowApi = {
    openWindow: ({ type, args }) =>
        ipcRenderer.send(WINDOW_EVENTS.OPEN, { type, args }),
    minimizeWindowById: (id) => ipcRenderer.send(WINDOW_EVENTS.MINIMIZE, { id }),
    closeWindowById: (id) => ipcRenderer.send(WINDOW_EVENTS.CLOSE, { id }),
    fullscreenWindowById: (id) =>
        ipcRenderer.send(WINDOW_EVENTS.FULLSCREEN, { id }),
    resizeWindowById: (id) => ipcRenderer.send(WINDOW_EVENTS.RESIZE, { id }),
};

contextBridge.exposeInMainWorld("windowAPI", windowAPI);
contextBridge.exposeInMainWorld("taskAPI", taskAPI);

export { TaskApi, WindowApi };
