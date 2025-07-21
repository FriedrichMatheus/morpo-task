import { IpcMainEvent } from "electron";
import { EventsCommons, WindowsCommons } from "../commons";
import { getDatabase } from "./config/db";
import { TaskRepository } from "./task/repository";
import TaskService from "./task/service";
import { TaskDTO } from "../commons/models";
import { MorpoWindowManager } from "./engine/window-manager";

const { TASK_EVENTS } = EventsCommons;
const { WINDOW_EVENTS } = WindowsCommons;

const db = getDatabase();

const taskRepository = new TaskRepository(db);
const taskService = new TaskService(taskRepository);

const windowManager = new MorpoWindowManager();

interface IEvents {
    event: string;
    handler: (event: IpcMainEvent, args: any) => void;
}

const events: IEvents[] = [
    {
        event: TASK_EVENTS.CREATE,
        handler: (event, data) => {
            taskService.createTask(data as TaskDTO);
            event.reply(TASK_EVENTS.SEND_ALL, taskService.getAllTask());
        },
    },
    {
        event: TASK_EVENTS.UPDATE,
        handler: (event, data) => {
            taskService.updateTaskById(data as TaskDTO);
            event.reply(TASK_EVENTS.SEND_ALL, taskService.getAllTask());
        },
    },
    {
        event: TASK_EVENTS.DELETE,
        handler: (event, data) => {
            console.log(data);
            taskService.deleteTaskById(data.id);
            event.reply(TASK_EVENTS.SEND_ALL, taskService.getAllTask());
        },
    },
    {
        event: TASK_EVENTS.FIND,
        handler: (event, data) => {
            taskService.getTaskById(data.id);
            event.reply(TASK_EVENTS.SEND_ALL, taskService.getAllTask());
        },
    },
    {
        event: TASK_EVENTS.GET_ALL,
        handler: (event, data) =>
            event.reply(TASK_EVENTS.SEND_ALL, taskService.getAllTask()),
    },
    {
        event: WINDOW_EVENTS.OPEN,
        handler: (event, data) => windowManager.createWindow(data.type, data.args),
    },
    {
        event: WINDOW_EVENTS.CLOSE,
        handler: (event, data) => windowManager.closeWindowById(data.id),
    },
    {
        event: WINDOW_EVENTS.MINIMIZE,
        handler: (event, data) => windowManager.minimizeWindowById(data.id),
    },
];

export { events, windowManager };
