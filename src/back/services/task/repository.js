import Database from "better-sqlite3"

class TaskRepository {
    constructor(db) {
        if(typeof db === Database) this.db = db;
    }

        
    insertTask({ description }) { 
        db.prepare("INSERT INTO task (description) VALUES (@description)").run({ description });
    }
}

db.exec(`CREATE TABLE IF NOT EXISTS task (
             id INTEGER PRIMARY KEY AUTOINCREMENT, 
             description TEXT)`)

const insertTask = ({ description }) => db.prepare("INSERT INTO task (description) VALUES (@description)").run({ description });

const getAllTask = () => db.prepare("SELECT * FROM task").all();

const getTaskById = ({ id }) => db.prepare("SELECT * FROM task WHERE id = @id").get({ id });

const deleteTaskById = ({ id }) => db.prepare("DELETE task WHERE id = @id").run({ id });

const updateTaskById = ({ id, description }) => db.prepare("UPDATE task SET description = @description WHERE id = @id").run({ id, description });

export { insertTask, getTaskById, getAllTask, deleteTaskById, updateTaskById }
