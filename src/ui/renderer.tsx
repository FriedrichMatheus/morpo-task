import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import TaskPage from "./pages/task/page";
import { NavBar } from "./components/navbar";
import { AppRoutes } from "../commons/routes";

const App = () => {
    return (
        <div className="bg-background-main 2xl:rounded-none rounded-lg h-screen overflow-hidden">
            <HashRouter>
                <NavBar />
                <Routes>
                    <Route path={AppRoutes.TASK.LIST} element={<TaskPage />} />
                </Routes>
            </HashRouter>
        </div>
    );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
