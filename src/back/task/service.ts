import { TaskDTO } from "../../commons/models";
import { TaskRepository } from "./repository";

export default class TaskService {
    repository: TaskRepository;

    constructor(repository: TaskRepository) {
        this.repository = repository;
    }

    createTask(task: TaskDTO) {
        insertTask(task);
    }
    getAllTask() {
        return getAllTask();
    }
    updateTaskById(task: TaskDTO) {
        updateTaskById(task);
    }
    deleteTaskById(id: number) {
        deleteTaskById(id);
    }
    getTaskById(id: number) {
        return getTaskById(id);
    }
}
