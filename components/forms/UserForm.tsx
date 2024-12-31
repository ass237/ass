"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { userSchema, UserSchema } from "@/lib/formValidation";
import { createUser, updateUser } from "@/lib/actions";
import { toast } from "react-toastify";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const UserForm = ({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update";
  data?: userSchema;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [state, setState] = useState<{ success: boolean; error: boolean }>({
    success: false,
    error: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userSchema>({
    resolver: zodResolver(UserSchema),
    defaultValues: data,
  });

  const onSubmit = handleSubmit(async (formData) => {
    try {
      setState({ success: false, error: false });

      if (type === "create") {
        await createUser(state,formData);
        toast.success("User created successfully!");
      } else if (type === "update") {
        const ID =formData?.id || ""
        delete formData.id;
        await updateUser(state,formData, ID);
        toast.success("User updated successfully!");
      }

      setState({ success: true, error: false });
      setOpen(false);
    } catch (error) {
      console.error("Error during submit:", error);
      setState({ success: false, error: true });
      toast.error("Something went wrong!");
    }
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.refresh();
    }
  }, [router,state.success]);

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new User" : "Update User"}
      </h1>
      <h1 className="text-xl font-semibold">
        ID: {data?.id }
      </h1>

      <span className="text-xs text-gray-400 font-medium">Authentication Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Name"
          name="name"
          register={register}
          error={errors.name}
          />
          {type==="update" &&(<InputField
              label="Blood Bank ID"
              name="id"
              defaultValue={data?.id}
              register={register}
              error={errors.name}
              hidden ={true}
            />)}
        <InputField
          label="First Name"
          name="firstname"
          register={register}
          error={errors.firstname}
        />
        <InputField
          label="Last Name"
          name="lastname"
          register={register}
          error={errors.lastname}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          register={register}
          error={errors.email}
        />
        <InputField
          label="Phone"
          name="phone"
          register={register}
          error={errors.phone}
        />
      </div>

      <span className="text-xs text-gray-400 font-medium">Personal Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Address"
          name="address"
          register={register}
          error={errors.address}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Blood Type</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("bloodType")}
          >
            <option value="" disabled>
              Select blood type
            </option>
            <option value="A_positive">A+</option>
            <option value="A_negative">A-</option>
            <option value="B_positive">B+</option>
            <option value="B_negative">B-</option>
            <option value="AB_positive">AB+</option>
            <option value="AB_negative">AB-</option>
            <option value="O_positive">O+</option>
            <option value="O_negative">O-</option>
            <option value="Unknown">Unknown</option>
          </select>
          {errors.bloodType?.message && (
            <p className="text-xs text-red-400">{errors.bloodType.message.toString()}</p>
          )}
        </div>
        <InputField
          label="Age"
          name="age"
          type="Number"
          register={register}
          error={errors.age}
        />
        <InputField
          label="Bio"
          name="bio"
          register={register}
          error={errors.bio}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Sex</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("sex")}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Unknown">Unknown</option>
          </select>
          {errors.sex?.message && (
            <p className="text-xs text-red-400">{errors.sex.message.toString()}</p>
          )}
        </div>
      </div>

      {state.error && <span className="text-red-500">Something went wrong!</span>}

      <button className="bg-blue-500 text-white rounded-md p-2 text-sm">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default UserForm;
