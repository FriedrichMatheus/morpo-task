import { useState } from "react";
import { TaskDTO } from "../../../../commons/models";
import { ChevronDown, ChevronUp, SquarePen, Trash } from "lucide-react";

interface TaskItemProps {
    task: TaskDTO;
}

function TaskItem({ task }: TaskItemProps) {
    const [isChecked, setIsChecked] = useState(task.status === "done");

    return (
        <li className="flex gap-2">
            <input
                type="checkbox"
                checked={isChecked}
                onClick={() => setIsChecked(!isChecked)}
            />
            {task.title}
        </li>
    );
}

interface TaskCardProps {
    task: TaskDTO;
}

function TaskCard({ task }: TaskCardProps) {
    const [isOpen, setOpen] = useState<boolean>(false);

    const taskDeleteHandler = (id: number) => window.taskAPI.deleteTask(id);

    return (
        <li className="bg-card-box p-4 rounded-md">
            <div className="flex gap-2 justify-between">
                <div className="flex gap-2">
                    <button onClick={() => setOpen(!isOpen)}>
                        {isOpen ? <ChevronUp /> : <ChevronDown />}
                    </button>
                    <h1>{task.title}</h1>
                </div>
                <div className="flex gap-2">
                    <button className="focus:outline-none hover:text-placeholder-text">
                        <SquarePen size={20} />
                    </button>
                    <button
                        onClick={() => taskDeleteHandler(task.id)}
                        className="focus:outline-none"
                    >
                        <Trash
                            size={20}
                            className="text-red-400 hover:text-placeholder-text"
                        />
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="flex flex-col p-4 gap-4">
                    <p className="line-clamp-3">{task.description}</p>
                    <ol>
                        <TaskItem
                            task={{
                                title: "SubTask Title Example 01",
                                description: "Subtask description example",
                                status: "done",
                            }}
                        />{" "}
                        <TaskItem
                            task={{
                                title: "SubTask Title Example 01",
                                description: "Subtask description example",
                                status: "done",
                            }}
                        />{" "}
                        <TaskItem
                            task={{
                                title: "SubTask Title Example 01",
                                description: "Subtask description example",
                                status: "done",
                            }}
                        />{" "}
                        <TaskItem
                            task={{
                                title: "SubTask Title Example 01",
                                description: "Subtask description example",
                                status: "done",
                            }}
                        />
                    </ol>
                </div>
            )}
        </li>
    );
}

interface TaskListProps {
    tasks: TaskDTO[];
}

function TaskList({ tasks }: TaskListProps) {
    return (
        <ol className="flex flex-col gap-2">
            {tasks.map((i) => (
                <TaskCard task={{ title: "Task Title Example", ...i }} />
            ))}
        </ol>
    );
}

export { TaskList };
