import { useEffect, useState } from "react";
import { TaskList } from "./components/task-list";
import { TaskDTO } from "../../../commons/models";
import { Plus } from "lucide-react";

function TaskPage() {
    const [tasks, setTasks] = useState<TaskDTO[]>([]);

    useEffect(() => window.taskAPI.getAllTask(), []);

    window.taskAPI.receiveTasks((event, tasks) => {
        setTasks(tasks);
    });

    return (
        <main className="flex flex-col h-full text-base px-6 pb-14">
            <div className="h-full">
                {tasks.length > 0 ? (
                    <TaskList tasks={tasks} />
                ) : (
                    <button className="flex focus:outline-none w-full h-full animate-pulse italic rounded-md justify-center items-center align-middle pb-24">
                        <Plus /> create a card... ᓚ₍ ^. .^₎
                    </button>
                )}
            </div>
        </main>
    );
}

export default TaskPage;
