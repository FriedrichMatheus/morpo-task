import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from "react-router-dom"
import TaskPage from './pages/task/page';

const App = () =>{
    return (
        <HashRouter>
            <Routes>
                <Route path='/' element={<TaskPage />}/>
            </Routes>
        </HashRouter>
    )
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App/>);
