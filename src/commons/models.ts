type TaskStatus = "done" | "pending" | "canceled" | "deleted";

interface TaskDTO {
    id?: number;
    title: string;
    status: TaskStatus;
    description: string;
}

export { TaskDTO };
