
import {z} from "zod";



export const UserSchema = z.object({
    id:z.string().optional(),
  name: z
    .string()
    .min(3,{message:"User name is too short, it must be at least 3 characters long"})
    .max(20,{message:"User name is too long, it must be at most 20 characters long"}),
  email: z.string().email({message:"Invalid email address!"}),
  firstname: z.string().min(1,{message:"First name is too short, it must be at least 1 character long"}).optional(),
  lastname: z.string().min(1,{message:"Last name is too short, it must be at least 1 character long"}).optional(),
  phone: z.string().min(10,{message:"Phone number is too short, it must be at least 10 characters long"}).optional(),
  address: z.string().min(1,{message:"Address is required!"}).optional(),
  age: z.preprocess((val) => (val === "" ? 0 : Number(val)), z.number({message:"Age is required!"})).optional(),
  bio:z
    .string()
    .min(1,{message:""})
    .max(500,{message:"max 500 character"})
    .optional()
    ,
  bloodType: z.enum([  "A_positive",
    "A_negative",
    "B_positive",
    "B_negative",
    "AB_positive",
    "AB_negative",
    "O_positive",
    "O_negative",
    "Unknown"],{message:"blood type is required!"}),
  
  sex: z.enum(["Male","Female","Other","Unknown"],{message:"Sex is required!"}),
  image: z.string().optional(),
  })

export type userSchema =z.infer<typeof UserSchema>;


export const BloodSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, { message: "Name is required and must be at least 3 characters long!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  phone: z.string().min(10, { message: "Contact must be at least 10 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  latitude: z
    .preprocess((val) => (val === "" ? 0 : Number(val)), z.number()),
  longitude: z
    .preprocess((val) => (val === "" ? 0 : Number(val)), z.number()),
  
  A_positive: z.preprocess((val) => (val === "" ? 0 : Number(val)), z.number()),
  A_negative: z.preprocess((val) => (val === "" ? 0 : Number(val)), z.number()),
  B_positive: z.preprocess((val) => (val === "" ? 0 : Number(val)), z.number()),
  B_negative: z.preprocess((val) => (val === "" ? 0 : Number(val)), z.number()),
  AB_positive: z.preprocess((val) => (val === "" ? 0 : Number(val)), z.number()),
  AB_negative: z.preprocess((val) => (val === "" ? 0 : Number(val)), z.number()),
  O_positive: z.preprocess((val) => (val === "" ? 0 : Number(val)), z.number()),
  O_negative: z.preprocess((val) => (val === "" ? 0 : Number(val)), z.number()),
});

export type bloodSchema = z.infer<typeof BloodSchema>;


export const EventSchema = z.object({
  
  id: z.string().optional(),
  name: z.string().min(3, "Name must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  startDate: z.string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Start date must be a valid date",
    })
    .refine((val) => new Date(val) > new Date(), {
      message: "Start date must be in the future",
    }),
  stopDate: z.string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "End date must be a valid date",
    })
    .refine((val) => new Date(val) > new Date(), {
      message: "End date must be in the future",
    }),
});

export type eventSchema = z.infer<typeof EventSchema>;

export const BloodFormSchema = z.object({
  name: z.string().min(3, { message: "Name is required and must be at least 3 characters long!" }),
  phone: z.string().min(10, { message: "Contact must be at least 10 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  address: z.string().min(3, { message: "Address is required and must be at least 3 characters long!" }),
  sex: z.enum(["Male", "Female"], { required_error: "Sex is required" }),
  age: z
    .number({ invalid_type_error: "Age must be a number" })
    .positive("Age must be a positive number")
    .int("Age must be an integer"),
  bloodQty: z
    .number({ invalid_type_error: "Blood quantity must be a number" })
    .positive("Blood quantity must be a positive number")
    .int("Blood quantity must be an integer"),
  bloodType: z.enum([
    "A_positive",
    "A_negative",
    "B_positive",
    "B_negative",
    "AB_positive",
    "AB_negative",
    "O_positive",
    "O_negative",
  ]),
  urgency: z.enum(["Low", "Medium", "High"]),
  role:z.enum([
    "GUEST",
    "VIP",
    "ADMIN",
    "REGULAR"
  ]),
});

export type bloodFormSchema = z.infer<typeof BloodFormSchema>;