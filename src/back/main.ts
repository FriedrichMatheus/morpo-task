import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import { TASK_EVENTS } from '../commons/events';

const squirrelStartup = process.platform === 'win32'
  ? (() => {
      try {
        return require('electron-squirrel-startup');
      } catch {
        return false;
      }
    })()
  : false;

if (squirrelStartup) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }
  
  mainWindow.webContents.openDevTools();
};



app.whenReady().then(() => {
  createWindow();
  console.log("window activated")    

  ipcMain.on(TASK_EVENTS.CREATE, (event, data) => {
    console.log(data);      
  });



  app.on('activate', () => {

    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

