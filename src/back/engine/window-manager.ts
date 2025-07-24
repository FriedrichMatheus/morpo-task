import { WindowsCommons } from "../../commons";
import { MorpoWindow, WindowProps } from "./window";
import { AppRoutes } from "../../commons/routes";

const { WINDOW_TYPE } = WindowsCommons;

interface IWindowType {
    type: string;
    multipleInstance?: boolean;
}

const WINDOWS_MAP = {
    [WINDOW_TYPE.HOME]: {
        width: 1200,
        height: 800,
        initialPath: AppRoutes.HOME,
        resizable: false,
        alwaysOnTop: false,
        windowType: {
            type: WINDOW_TYPE.HOME,
            multipleInstance: false,
        } as IWindowType,
    } as WindowProps,
    [WINDOW_TYPE.TASK_LIST]: {
        width: 400,
        height: 600,
        initialPath: AppRoutes.TASK.LIST,
        resizable: false,
        useContentSize: true,
        alwaysOnTop: true,
        windowType: {
            type: WINDOW_TYPE.TASK_LIST,
            multipleInstance: false,
        } as IWindowType,
    } as WindowProps,
};

const SINGLE_INSTANCE_WINDOW = {
    [WINDOW_TYPE.TASK_LIST]: true,
    [WINDOW_TYPE.HOME]: true,
};

type WindowById = { [key: string]: MorpoWindow };

class MorpoWindowManager {
    private windows: WindowById;
    private singleInstanceWindows: WindowById;

    constructor() {
        this.windows = {};
        this.singleInstanceWindows = {};
    }

    createWindow(type: string, args?: any) {
        const windowProps = WINDOWS_MAP[type];
        if (!windowProps) return;
        const window = this.handleSingleInstance(type);

        if (!this.windows[window.id]) {
            this.windows[window.id] = window;
        }
    }

    handleSingleInstance(type: string) {
        if (!SINGLE_INSTANCE_WINDOW[type])
            return new MorpoWindow(WINDOWS_MAP[type]);

        let window = this.singleInstanceWindows[type];
        if (window) {
            window.focus();
            return window;
        }

        window = new MorpoWindow(WINDOWS_MAP[type]);
        this.singleInstanceWindows[type] = window;
        this.windows[window.id] = window;
        return window;
    }

    fullscreenWindowById(id: string) {
        const window = this.windows[id];
        if (!window.fullScreenOn) {
            window.fullScreen();
            return;
        }

        window.resize();
    }

    closeWindowById(id: string) {
        this.windows[id].close();

        delete this.singleInstanceWindows[this.windows[id].windowType.type];
        delete this.windows[id];
    }

    minimizeWindowById(id: string) {
        console.log(id);
        this.windows[id].minimize();
    }
}

export { IWindowType, MorpoWindowManager };
