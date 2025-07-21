import { app, BrowserWindow, ipcMain } from "electron";
import { events, windowManager } from "./events";
import { WindowsCommons } from "../commons";

const { WINDOW_TYPE } = WindowsCommons;

const setup = () => {
    windowManager.createWindow(WINDOW_TYPE.HOME);
    events.forEach((i) => ipcMain.on(i.event, i.handler));
};

app.whenReady().then(() => {
    setup();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            windowManager.createWindow(WINDOW_TYPE.TASK_LIST);
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
