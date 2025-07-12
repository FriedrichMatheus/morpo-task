import { useForm, UseFormRegister, FieldValues } from "react-hook-form"
import { TaskDTO } from "../../../commons/models";

interface InputProps {
    label?: string;
    placeholder: string;
    name: string;
    register: UseFormRegister<FieldValues>;
    required?: boolean;
}

const Input = ({ label, placeholder, name, register, required }: InputProps) => (
    <> 
        { label && <label>{label}</label> }
        <input className="border-gray-700 border-2 focus:border-gray-400 focus:outline-gray-400 text-gray-800 rounded-sm p-1" placeholder={placeholder}  {...register(name, { required })}/>
    </> 
);

function TaskPage() {
    const { register, handleSubmit } = useForm();

    const createTask = (task: TaskDTO) => {
        window.taskAPI.createTask(task);
    }

    return (
        <main>
            <h1>Task List</h1>

            <form onSubmit={handleSubmit(createTask)}>
                <Input register={register} name={"description"} placeholder={"Escreva sua atividade"} required  />
            </form>
        </main>
    )
}

export default TaskPage;
