import path from "path"
import fs from "fs"
import { app } from "electron";
import { Database } from "../models/database";


const userDataDir = app.getPath('userData');

const dbPath = path.join(userDataDir, 'databases/database-002.db');
const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);

export { db };
