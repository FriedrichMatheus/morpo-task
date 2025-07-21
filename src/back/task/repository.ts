import { TaskDTO } from "../../commons/models";
import { Column, Database, Table } from "../models/database";

class TaskRepository {
    db: Database;
    table: Table;
    constructor(db: Database) {
        this.db = db;

        this.table = new Table("task", [
            new Column("id", "INTEGER", true, true),
            new Column("description", "TEXT"),
        ]);

        this.db.createTable(this.table);
    }

    insertTask({ description }: TaskDTO) {
        this.db.query(this.table._stringfyInsertRow({ description }), {
            description,
        });
    }

    getAllTask() {
        return this.db.query(this.table._stringfySelectRow());
    }

    getTaskById(id: number) {
        return this.db.query(this.table._stringfySelectRow({ id: id }), { id: id });
    }

    deleteTaskById(id: number) {
        this.db.query(this.table._stringfyDeleteRow({ id: id }), { id: id });
    }

    updateTaskById({ id, ...rest }: TaskDTO) {
        return this.db.query(
            this.table._stringfyUpdateRow({ id: id }, { ...rest }), { ...rest }
        );
    }
}

export { TaskRepository };
