import { useForm } from "react-hook-form"

const Input = ({ label, placeholder, name, register, required }) => (
    <> 
        { label && <label>{label}</label> }
        <input className="border-gray-700 border-2 focus:border-gray-400 focus:outline-gray-400 text-gray-800 rounded-sm p-1" placeholder={placeholder}  {...register(name, { required })}/>
    </> 
);

function TaskPage() {
    const { register, handleSubmit } = useForm();

    const createTask = (task) => {
        window.taskAPI.createTask(task);
    }

    return (
        <main>
            <h1>Task List</h1>

            <form onSubmit={handleSubmit(createTask)}>
                <Input register={register} name={"task"} placeholder={"Escreva sua atividade"} required  />
            </form>
        </main>
    )
}

export default TaskPage;
