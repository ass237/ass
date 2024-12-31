import { FieldError } from "react-hook-form";
/* eslint-disable @typescript-eslint/no-explicit-any */

type InputFieldProps = {
    label: string;
    type?: string;
    register: any;
    name: string;
    defaultValue?: string;
    error?: FieldError;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    hidden?: boolean;  // Add a hidden prop to hide the input field in certain cases (like password fields)  // Example: <InputField label="Password" name="password" type="password" hidden={true} />  // This will hide the password input field in the form.  // Note: This is just a simple example, you can add more logic based on your requirements.  // For example, you could hide a field based on the value of another field,
  }; 
 
   
 const InputField = ({
    label, 
    type = "text",
    register,
    name,
    defaultValue,
    error,
    inputProps,
    hidden = false,  // Add a hidden prop to hide the input field in certain cases (like password fields)  // Example: <InputField label="Password" name="password" type="password" hidden={true} />  // This will hide the password input field in the form.  // Note: This is just a simple example, you can add more logic based on your requirements.  // For example, you could hide a field based on the value of another field,
 }: InputFieldProps) => {  
   return (
    <div className=" flex flex-col gap-2 w-full md:w-1/4">

    <label className="text-xs text-gray-400" hidden = {hidden}>{label}</label>
    <input 
        type={type} 
        className="ring-[1.5px] ring-gray-300 rounded-md p-2 text-sm" 
        {...register(name)}
        {...inputProps}
        defaultValue={defaultValue}
        hidden = {hidden}
        />
    {error?.message && <p className="text-xs text-red-500">{error?.message.toString()}</p>}
  </div>
   )
 }
 
 export default InputField