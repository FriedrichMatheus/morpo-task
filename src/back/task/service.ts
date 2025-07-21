import { TaskDTO } from "../../commons/models";
import { TaskRepository } from "./repository";

export default class TaskService {
    repository: TaskRepository;

    constructor(repository: TaskRepository) {
        this.repository = repository;
    }

    createTask(task: TaskDTO) {
        this.repository.insertTask(task);
    }
    getAllTask() {
        return this.repository.getAllTask();
    }
    updateTaskById(task: TaskDTO) {
        this.repository.updateTaskById(task);
    }
    deleteTaskById(id: number) {
        this.repository.deleteTaskById(id);
    }
    getTaskById(id: number) {
        return this.repository.getTaskById(id);
    }
}
