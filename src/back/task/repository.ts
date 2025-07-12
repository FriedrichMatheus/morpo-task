import { TaskDTO } from "../../commons/models";
import { Database } from "../models/database";

class TaskRepository {
    db: Database; 
    constructor(db: Database) {
        this.db = db;
    }

    insertTask(task: TaskDTO) {}

    getAllTask() {}

    getTaskById() {}

    deleteTaskById() {}

    updateTaskById() {}
}


export { TaskRepository };
