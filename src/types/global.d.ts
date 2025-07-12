import { TaskDTO } from "src/commons/models";

export {}

declare global {
    interface Window {
        taskAPI: {
            createTask: (task: TaskDTO) => void;
            getAllTask: () => Promise<TaskDTO>;
            updateTask: (task: TaskDTO) => void;
            findTask: () => Promise<TaskDTO>;
            deleteTask: (task: TaskDTO) => void;
        }
    }
}
