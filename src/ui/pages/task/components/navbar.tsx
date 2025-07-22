import { Minus, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";

function NavBar() {
    const [searchParams] = useSearchParams();
    const windowId = searchParams?.get("windowId");

    const closeWindowById = () =>
        windowId && window.windowAPI.closeWindowById(windowId);
    const minimizeWindowById = () =>
        windowId && window.windowAPI.minimizeWindowById(windowId);

    return (
        <nav className="h-16 w-full flex align-middle px-6 mb-6 items-center text-base text-2xl draggable justify-between">
            <h1>morpo</h1>
            <div className="flex non-draggable">
                <button
                    className="focus:outline-none"
                    onClick={() => minimizeWindowById()}
                >
                    <Minus />
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
