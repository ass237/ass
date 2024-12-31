"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventSchema, eventSchema } from "@/lib/formValidation";
import { createEvent, updateEvent } from "@/lib/actions"; // Assume you have an action for creating/updating events
import { toast } from "react-toastify";
import { Dispatch, SetStateAction, useEffect, useState } from "react"; // useState, useEffect
import InputField from "../InputField"; // Your InputField component
import { useRouter } from "next/navigation";

// Utility function to format date as 'yyyy/mm/dd'
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

const EventForm = ({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update";
  data: eventSchema;
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
  } = useForm<eventSchema>({
    resolver: zodResolver(EventSchema),
  });

  // onSubmit function
  const onSubmit = handleSubmit(async (formData) => {
    try {
      setState({ success: false, error: false }); // Reset state before action

      // Convert date strings to 'yyyy/mm/dd' format
      const preparedData = {
        ...formData,
        startDate: formatDate(new Date(formData.startDate)),
        stopDate: formatDate(new Date(formData.stopDate)),
      };

      if (type === "create") {
        await createEvent(state, preparedData);
      }
      if (type === "update") {
        const ID = preparedData?.id || "";
        delete preparedData.id;
        await updateEvent(state, preparedData, ID);
      }

      setState({ success: true, error: false });
      toast(`Event has been ${type === "create" ? "created" : "updated"}!`);
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
  }, [router, state.success]);

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new Event" : "Update Event"}
      </h1>
      <h1 className="text-xl font-semibold">
        {type === "update" ? `ID:${data?.id}` : ""}
      </h1>
      <span className="text-xs text-gray-400 font-medium">Event Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        {type === "update" && (
          <InputField
            label="Event ID"
            name="id"
            defaultValue={data?.id}
            register={register}
            error={errors.name}
            hidden={true}
          />
        )}
        <InputField
          label="Event Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors.name}
        />
        <InputField
          label="Description"
          name="description"
          type="text"
          defaultValue={data?.description}
          register={register}
          error={errors.description}
        />
      </div>

      <span className="text-xs text-gray-400 font-medium">Event Date</span>

      <div className="flex justify-between flex-wrap gap-4">
        {/* Start Date Input */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Start Date</label>
          <input
            type="date"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("startDate")}
            defaultValue={data?.startDate ? formatDate(new Date(data.startDate)) : ""}
          />
          {errors.startDate?.message && (
            <p className="text-xs text-red-400">{errors.startDate.message}</p>
          )}
        </div>

        {/* End Date Input */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">End Date</label>
          <input
            type="date"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("stopDate")}
            defaultValue={data?.stopDate ? formatDate(new Date(data.stopDate)) : ""}
          />
          {errors.stopDate?.message && (
            <p className="text-xs text-red-400">{errors.stopDate.message}</p>
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

export default EventForm;
