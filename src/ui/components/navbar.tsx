import { Minus, Square, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { WINDOW_TYPE } from "../../commons/windows";

function 

function NavBar() {
    const [searchParams] = useSearchParams();
    const windowId = searchParams?.get("windowId");

    const closeWindowById = () =>
        windowId && window.windowAPI.closeWindowById(windowId);
    const minimizeWindowById = () =>
        windowId && window.windowAPI.minimizeWindowById(windowId);

    const fullscreenWindowById = () =>
        windowId && window.windowAPI.fullscreenWindowById(windowId);

    const openWindowByType = (type: string, args?: any) =>
        window.windowAPI.openWindow({ type, args });

    return (
        <nav className="h-16 w-full flex align-middle px-6 mb-6 items-center text-base text-2xl draggable justify-between">
            <div className="flex gap-6 align-middle items-center justify-center">
         `       <h1>morpo</h1>
                <ul className="text-lg flex gap-4 portrait:sr-only">
                    <li className="hover:text-input-bg non-draggable">
                        <button onClick={() => openWindowByType(WINDOW_TYPE.HOME)}>
                            home
                        </button>
                    </li>
                    <li className="hover:text-input-bg non-draggable">
                        <button onClick={() => openWindowByType(WINDOW_TYPE.TASK_LIST)}>
                            tasks
                        </button>
                    </li>
                </ul>
            </div>
            <div className="flex gap-1 non-draggable">
                <button
                    className="focus:outline-none"
                    onClick={() => minimizeWindowById()}
                >
                    <Minus />
                </button>
                <button
                    className="focus:outline-none"
                    onClick={() => fullscreenWindowById()}
                >
                    <Square size={16} />
                </button>
                <button
                    className="focus:outline-none"
                    onClick={() => closeWindowById()}
                >
                    <X />
                </button>
            </div>
        </nav>
    );
}

export { NavBar };
