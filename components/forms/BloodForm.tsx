"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BloodSchema, bloodSchema } from "@/lib/formValidation";
import { createBloodBank,updateBloodBank } from "@/lib/actions"; // Assume you have an action for creating/updating blood banks
import { toast } from "react-toastify";
import { Dispatch, SetStateAction, useEffect, useState } from "react"; // useState, useEffect
import InputField from "../InputField"; // Your InputField component
import { useRouter } from "next/navigation";


const BloodForm = ({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update";
  data: bloodSchema;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  // Using useState to track success and error states
  const [state, setState] = useState<{ success: boolean; error: boolean }>({
    success: false,
    error: false,
  });

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<bloodSchema>({
    resolver: zodResolver(BloodSchema),
  });

  // onSubmit function
  const onSubmit = handleSubmit(async (data) => {
    try {
      setState({ success: false, error: false }); // Reset state before action

      // Simulate API call or action depending on type (create or update)
      if(type === "create" ){
        await createBloodBank(state,data);
      }
      if(type === "update" ){
        // const data1 = prisma.bloodBank.findMany()
         const ID =data?.id || ""
         delete data.id;
         console.log(ID)
         console.log(data)
        await updateBloodBank(state,data,ID);
      }
      // Simulate success
      setState({ success: true, error: false });
      toast(`Blood Bank has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false); // Close form after successful operation
    } catch (error) {
      console.error("Error during submit:", error);
      setState({ success: false, error: true });
      toast.error("Something went wrong!");
    }
  });

  const router = useRouter();

  // Effect hook to handle success message display
  useEffect(() => {
    if (state.success) {
      toast.success("Operation successful!");
      router.refresh();
    }
  }, [router,state.success]);

  // List of blood types (you can extend this if necessary)


  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new Blood Bank" : "Update Blood Bank"}
      </h1>
      <h1 className="text-xl font-semibold">
        {type === "update" ? `ID:${data?.id}` : ""}
      </h1>
      <span className="text-xs text-gray-400 font-medium">Blood Bank Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        {type==="update" &&(<InputField
          label="Blood Bank ID"
          name="id"
          defaultValue={data?.id}
          register={register}
          error={errors.name}
          hidden ={true}
        />)}
        <InputField
          label="Blood Bank Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors.name}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          defaultValue={data?.email}
          register={register}
          error={errors.email}
        />
        <InputField
          label="Phone"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
      </div>

      <span className="text-xs text-gray-400 font-medium">Location Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Latitude</label>
          <input
            type="number"
            step="any"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("latitude")}
            defaultValue={data?.latitude !== undefined ? String(data.latitude) : ""}
          />
          {errors.latitude?.message && (
            <p className="text-xs text-red-400">{errors.latitude.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Longitude</label>
          <input
            type="number"
            step="any"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("longitude")}
            defaultValue={data?.longitude !== undefined ? String(data.longitude) : ""}
          />
          {errors.longitude?.message && (
            <p className="text-xs text-red-400">{errors.longitude.message}</p>
          )}
        </div>
      </div>

      <span className="text-xs text-gray-400 font-medium">Blood Types Quantities</span>
      <div className="flex justify-between flex-wrap gap-4">
          <InputField
            type="number"
            label={"A+"}
            name={"A_positive"}
            defaultValue={data?.A_positive !== undefined ? String(data.A_positive) : ""}
            register={register}
            error={errors.A_positive}
          />
          <InputField
            type="number"
            label={"A-"}
            name={"A_negative"}
            defaultValue={data?.A_negative !== undefined ? String(data.A_negative) : ""}
            register={register}
            error={errors.A_negative}
          />
          <InputField
            type="number"
            label={"B+"}
            name={"B_positive"}
            defaultValue={data?.B_positive !== undefined ? String(data.B_positive) : ""}
            register={register}
            error={errors.B_positive}
          />
          <InputField
            type="number"
            label={"B-"}
            name={"B_negative"}
            defaultValue={data?.B_negative !== undefined ? String(data.B_negative) : ""}
            register={register}
            error={errors.B_negative}
          />
          <InputField
            type="number"
            label={"AB-"}
            name={"AB_negative"}
            defaultValue={data?.AB_negative !== undefined ? String(data.AB_negative) : ""}
            register={register}
            error={errors.AB_negative}
          />
          <InputField
            type="number"
            label={"AB+"}
            name={"AB_positive"}
            defaultValue={data?.AB_positive !== undefined ? String(data.AB_positive) : ""}
            register={register}
            error={errors.AB_positive}
          />
          <InputField
            type="number"
            label={"O+"}
            name={"O_positive"}
            defaultValue={data?.O_positive !== undefined ? String(data.O_positive) : ""}
            register={register}
            error={errors.O_positive}
          />
          <InputField
            type="number"
            label={"O-"}
            name={"O_negative"}
            defaultValue={data?.O_negative !== undefined ? String(data.O_negative) : ""}
            register={register}
            error={errors.O_negative}
          />
          
      </div>

      {state.error && <span className="text-red-500">Something went wrong!</span>}

      <button className="bg-blue-500 text-white rounded-md p-2 text-sm">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default BloodForm;