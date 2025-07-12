import SQLite from "better-sqlite3"

type ColumnType = "INTEGER" | "TEXT"; 

class Column {
    name: string;
    type: ColumnType;
    unique: boolean;
    autoIncrement: boolean;
    isPrimary: boolean;
    required: boolean;

    constructor(name: string, type: ColumnType, isPrimary: boolean = false,
    autoIncrement: boolean = true, required: boolean = false, unique: boolean = false) {
        this.name = name;
        this.type = type;
        this.autoIncrement = autoIncrement;
        this.isPrimary = isPrimary;
        this.required = required;
        this.unique = unique;
    }
    
    private getColumnModifiers() {
        let modifiers: string[] = [];

        if(this.isPrimary) {
            modifiers.push("PRIMARY KEY");
            if(this.autoIncrement) modifiers.push("AUTOINCREMENT");

            return modifiers;
        }
        if(this.required) {
            modifiers.push("NOT NULL")
        }
        if(this.unique) {
            modifiers.push("UNIQUE")
        }
    }

    _stringfyColumn () { 
        return this.name + this.type + this.getColumnModifiers.toString();
    }
}

class Table {
    name: string;
    columns: Column[];

    constructor(name: string, columns: Column[] = []) {
        this.name = name;
        this.columns = columns;
    }

    addColumn(column: Column) {
        this.columns.push(column);
    }

    getName() {
        return this.name;
    }

    private _getColumnsString() {
        return this.columns.map(i => i._stringfyColumn()).toString();
    }

    private _getColumnsByKey(keys: string[]) {
        return keys.map(i => this.columns.find(c => c.name === i));
    }

    _stringfyInsertRow(objToInsert: Object) {
        const keys = Object.keys(objToInsert);

        const columns = this._getColumnsByKey(keys);

        return `INSERT INTO ${this.name}(${columns.toString()}) 
                     VALUES (${columns.map(i => `@${i}`).toString()})`;
    }
    
    _stringfyDeleteRow(findBy: Object) {
        const keysToFind = Object.keys(findBy);

        return `DELETE ${this.name} 
                 WHERE 1 = 1 
                       ${keysToFind.map(i => `${i} = @${i}`).fill(" AND ")}`
    }

    _stringfyUpdateRow(findBy: Object, objToUpdate: Object) {
        const keysToUpdate = Object.keys(objToUpdate)
        const keysToFind = Object.keys(findBy);

        const columnsToUpdate = this._getColumnsByKey(keysToUpdate);
        const columnsToFind = this._getColumnsByKey(keysToFind);

        return `UPDATE ${this.name} 
                   SET ${columnsToUpdate.map(i => `${i} = @${i}`)} 
                 WHERE ${columnsToFind.map(i => `${i} = @${i}`).fill(" AND ")}`
    }

    _stringfyCreateTable() {
        return `CREATE TABLE IF NOT EXISTS ${this.name} (
                    ${this._getColumnsString()}
                )`;
    }
}

class Database {
    db: SQLite.Database;
    constructor(dbPath: string) {
        this.db = new SQLite(dbPath);
        this.db.pragma('journal_mode = WAL');
    }

    createTable(table: Table) {
        this.db.exec(table._stringfyCreateTable());
    }
}

export { Database, Column }
