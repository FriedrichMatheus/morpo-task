import { FieldValues, UseFormRegister } from "react-hook-form/dist";

interface InputProps {
    label?: string;
    placeholder: string;
    name: string;
    register: UseFormRegister<FieldValues>;
    required?: boolean;
}

const Input = ({
    label,
    placeholder,
    name,
    register,
    required,
}: InputProps) => (
    <>
        {label && <label>{label}</label>}
        <input
            className="border-gray-500 bg-[#2F323D] p-2 placeholder-[#6D6D6D] focus:outline-none w-full rounded-md"
            placeholder={placeholder}
            {...register(name, { required })}
        />
    </>
);

export { Input };
