"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import UserForm from "@/components/forms/UserForm";
import BloodForm from "@/components/forms/BloodForm";
import EventForm from "@/components/forms/EventForm";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
// import { deleteUser, deleteBloodBank, deleteEvent } from "@/lib/actions";

// const deleteActionMap = {
//   user: deleteUser,
//   bloodBank: deleteBloodBank,
//   event: deleteEvent,
// };

const forms: {
  [key: string]: (
    type: "create" | "update",
    setOpen: Dispatch<SetStateAction<boolean>>,
    data?: any
  ) => JSX.Element;
} = {
  user: (type, setOpen, data) => <UserForm setOpen={setOpen} type={type} data={data} />,
  bloodBank: (type, setOpen, data) => <BloodForm setOpen={setOpen} type={type} data={data} />,
  event: (type, setOpen, data) => <EventForm setOpen={setOpen} type={type} data={data} />,
};

const FormModel = ({
  table,
  type,
  data,
  id,
}: {
  table: "user" | "bloodBank" | "event";
  type: "create" | "update" | "delete";
  data?: any;
  id?: string;
  name?: string;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-blue-500"
      : type === "update"
      ? "bg-blue-200"
      : type === "delete"
      ? "bg-purple-200"
      : "bg-red-500";

  const [open, setOpen] = useState(false);
  const [deleteState, setDeleteState] = useState<{ success: boolean; error: boolean }>({
    success: false,
    error: false,
  });
  const router = useRouter();

  const handleDelete = async () => {
    if (id) {
      try {
        // await deleteActionMap[table](id);
        setDeleteState({ success: true, error: false });
      } catch (error) {
        console.error("Error deleting:", error);
        setDeleteState({ success: false, error: true });
        toast.error("Something went wrong!");
      }
    }
  };

  useEffect(() => {
    if (deleteState.success) {
      toast(`${table} has been deleted!`);
      setOpen(false);
      router.refresh();
    }
  }, [router, deleteState.success, table]);

  const Form = () => {
    if (type === "delete" && id) {
      return (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleDelete();
          }}
          className="p-4 flex flex-col gap-4"
        >
          <div className="text-center font-medium">
            <p>
              <strong>ID:</strong> {id}
            </p>
            {/* <p>
              <strong>Name:</strong> {name || "N/A"}
            </p> */}
            <p>All data will be lost. Are you sure you want to delete this {table}?</p>
          </div>
          <button
            type="submit"
            className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center"
          >
            Delete
          </button>
        </form>
      );
    }

    return type === "create" || type === "update" ? (
      forms[table] ? (
        forms[table](type, setOpen, data)
      ) : (
        <div>Form not found for table: {table}</div>
      )
    ) : (
      <div>Invalid form type</div>
    );
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt={type} width={16} height={16} />
      </button>
      {open && (
        <div className="w-screen h-screen fixed left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] max-h-[90vh] overflow-y-auto">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="Close" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModel;
