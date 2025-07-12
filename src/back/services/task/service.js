import { getAllTask, getTaskById, insertTask, updateTaskById, deleteTaskById } from "./repository";

export default class TaskService {
    createTask(task) {
        insertTask(task);
    }
    getAllTask() {
        return getAllTask();
    }
    updateTaskById(task) {
        updateTaskById(task);
    }
    deleteTaskById(id) {
        deleteTaskById({ id });
    }
    getTaskById(id) {
        return getTaskById({ id });
    }
}
