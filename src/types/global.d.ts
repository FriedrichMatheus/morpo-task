import { TaskApi, WindowApi } from "../ui/preload";

export { };

declare global {
    interface Window {
        taskAPI: TaskApi;
        windowAPI: WindowApi;
    }
}
