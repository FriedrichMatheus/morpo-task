import { BrowserWindow } from "electron";
import path from "node:path";
import { UUID, randomUUID } from "node:crypto";
import { IWindowType } from "../engine/window-manager";

interface WindowProps {
    width: number;
    height: number;
    alwaysOnTop?: boolean;
    useContentSize?: boolean;
    resizable?: boolean;
    windowType: IWindowType;
    initialPath: string;
}

interface IWindowSize {
    width: number;
    height: number;
}

class MorpoWindow {
    private window: BrowserWindow;
    private initialSize: IWindowSize;
    id: UUID;
    fullScreenOn: boolean;
    windowType: IWindowType;

    constructor({
        initialPath,
        windowType,
        width,
        height,
        ...props
    }: WindowProps) {
        this.window = new BrowserWindow({
            thickFrame: false,
            frame: false,
            width: width,
            height: height,
            transparent: true,
            autoHideMenuBar: true,
            icon: "assets/icon.png",
            webPreferences: {
                preload: path.join(__dirname, "preload.js"),
            },
            ...props,
        });
        this.initialSize = { width, height };

        this.windowType = windowType;
        this.id = randomUUID();
        this.navigate(initialPath);
    }

    fullScreen() {
        this.fullScreenOn = !this.fullScreenOn;
        this.window.setFullScreen(!this.fullScreenOn);
    }

    resize(size?: IWindowSize) {
        if (!size) {
            if (this.fullScreenOn) {
                this.fullScreen();
            }

            this.window.setSize(
                this.initialSize.width,
                this.initialSize.height,
                true,
            );
            return;
        }

        this.window.setSize(size.width, size.height, true);
    }

    focus() {
        this.window.show();
        this.window.focus();
    }

    close() {
        this.window.close();
    }

    minimize() {
        this.window.minimize();
    }

    navigate(pathToNavigate: string) {
        if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
            this.window.loadURL(
                `${MAIN_WINDOW_VITE_DEV_SERVER_URL}#${pathToNavigate}?windowId=${this.id}`,
            );
            return;
        }

        this.window.loadFile(
            path.join(
                __dirname,
                `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html#${pathToNavigate}?windowId=${this.id}`,
            ),
        );
    }
}

export { MorpoWindow, WindowProps };
