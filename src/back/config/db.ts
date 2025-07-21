import path from "path";
import fs from "fs";
import { app } from "electron";
import { Database } from "../models/database";

function getDatabase() {
    const userDataDir = app.getPath("userData");

    const databasesDir = "databases";
    const dbPath = path.join(
        userDataDir,
        "Local Storage",
        databasesDir,
        "database-002.db",
    );
    const dbDir = path.dirname(dbPath);

    if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
    }
    return new Database(dbPath);
}

export { getDatabase };
