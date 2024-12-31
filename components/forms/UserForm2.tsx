"use client";

import axios from "axios";
import { BloodType, Sex } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateUser } from "@/lib/actions";
import { X } from "lucide-react"; // Importing the close icon from Lucide
import { useRouter } from "next/navigation";

interface UserFormProps {
  id: string;
  open: boolean;
  onClose: () => void; // Callback to close the modal
}

const UserForm: React.FC<UserFormProps> = ({ id, open, onClose }) => {
  const [state, setState] = useState<{ success: boolean; error: boolean }>({
    success: false,
    error: false,
  });
  const [formData, setFormData] = useState({
    name: "",
    firstname: "",
    lastname: "",
    email: "",
    sex: Sex.Unknown,
    phone: "",
    address: "",
    bloodType: BloodType.Unknown,
    bio: "",
    age: 0,
  }); // Editable form state
  const [errors, setErrors] = useState<any>({}); // Error state for each field
  const router =useRouter();
  useEffect(() => {
    if (!id || !open) return;

    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/user?id=${id}`);
        const fetchedData = response.data?.data;

        if (fetchedData) {
          const { age, name, email, lastname, firstname, bloodType, sex, address, phone, bio } = fetchedData;
          setFormData({ age, name, email, lastname, firstname, bloodType, sex, address, phone, bio });
          toast.success("Fetched user data.");
        } else {
          toast.error("No user data found.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data.");
      }
    };

    fetchUser();
  }, [id, open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev: Record<string, string | undefined>) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateUser(state, formData, id);
      toast.success("User updated successfully!");
      setState({ success: true, error: false });
      onClose(); // Close the modal on success
      router.refresh();
    } catch (error) {
      console.error("Error during submit:", error);
      setState({ success: false, error: true });
      toast.error("Something went wrong!");
    }
  };

  if (!open) return null; // Do not render if not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
        <button
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 focus:outline-none"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <form onSubmit={handleSubmit}>
          <h1 className="mb-6 text-2xl font-bold text-center text-gray-700">Personal information</h1>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Input fields go here (reuse your form fields logic) */}
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            {/* Repeat similar fields for other inputs */}
            
                      {/* Firstname Field */}
                      <div>
                        <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-600">
                          Firstname
                        </label>
                        <input
                          type="text"
                          id="firstname"
                          name="firstname"
                          value={formData.firstname}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 ${errors.firstname ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>} {/* Error Message */}
                      </div>
            
                      {/* Lastname Field */}
                      <div>
                        <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-600">
                          Lastname
                        </label>
                        <input
                          type="text"
                          id="lastname"
                          name="lastname"
                          value={formData.lastname}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 ${errors.lastname ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>} {/* Error Message */}
                      </div>
            
                      {/* Email Field */}
                      <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          readOnly
                          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>} {/* Error Message */}
                      </div>
            
                      {/* Sex Field */}
                      <div>
                        <label htmlFor="sex" className="block mb-2 text-sm font-medium text-gray-600">
                          Sex
                        </label>
                        <select
                          id="sex"
                          name="sex"
                          value={formData.sex}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 ${errors.sex ? "border-red-500" : "border-gray-300"}`}
                        >
                          {Object.values(Sex).map((value) => (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                        {errors.sex && <p className="text-red-500 text-sm">{errors.sex}</p>} {/* Error Message */}
                      </div>
            
                      {/* Blood Type Field */}
                      <div>
                        <label htmlFor="bloodType" className="block mb-2 text-sm font-medium text-gray-600">
                          Blood Type
                        </label>
                        <select
                          id="bloodType"
                          name="bloodType"
                          value={formData.bloodType}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 ${errors.bloodType ? "border-red-500" : "border-gray-300"}`}
                        >
                          {Object.values(BloodType).map((value) => (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                        {errors.bloodType && <p className="text-red-500 text-sm">{errors.bloodType}</p>} {/* Error Message */}
                      </div>
            
                      {/* Phone Field */}
                      <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-600">
                          Phone
                        </label>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>} {/* Error Message */}
                      </div>
            
                      {/* Address Field */}
                      <div>
                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-600">
                          Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 ${errors.address ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>} {/* Error Message */}
                      </div>
            
                      {/* Age Field */}
                      <div>
                        <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-600">
                          Age
                        </label>
                        <input
                          type="number"
                          id="age"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 ${errors.age ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>} {/* Error Message */}
                      </div>
          </div>
            
                    {/* Bio Field */}
                    <div>
                      <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-600">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 ${errors.bio ? "border-red-500" : "border-gray-300"}`}
                        rows={4}
                      />
                      {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>} {/* Error Message */}
                    </div>
            

          <button
            type="submit"
            className="w-full px-4 py-2 mt-6 font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-400"
          >
            Update profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
