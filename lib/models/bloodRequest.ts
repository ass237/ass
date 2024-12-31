import { Schema, model, models } from "mongoose";

// Define Enums for better type safety and clarity
export const Role = {
  ADMIN: "ADMIN",
  REGULAR: "REGULAR",
  GUEST: "GUEST",
  VIP: "VIP",
};

export const BloodType = {
  A_positive: "A_positive",
  A_negative: "A_negative",
  B_positive: "B_positive",
  B_negative: "B_negative",
  AB_positive: "AB_positive",
  AB_negative: "AB_negative",
  O_positive: "O_positive",
  O_negative: "O_negative",
  Unknown: "Unknown",
};

export const Sex = {
  Male: "Male",
  Female: "Female",
  Other: "Other",
  Unknown: "Unknown",
};

export const Status = {
  accepted: "accepted",
  pending: "pending",
  rejected: "rejected",
};

// Define the Mongoose Schema for BloodRequest
const BloodRequestSchema = new Schema(
  {
    name: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    date: {type: Date, default: Date.now },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    age: { type: Number, required: true }, // age as a number
    sex: { type: String, enum: Object.values(Sex), required: true },
    bloodType: { type: String, enum: Object.values(BloodType), required: true },
    bloodQty: { type: Number, required: true }, // blood quantity as a number
    urgency: { type: String, required: true },
    status: { type: String, enum: Object.values(Status), required: true },
    role: { type: String, enum: Object.values(Role), default: Role.GUEST },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    collection: 'BloodRequest'
  }
);

// Export the model, ensuring consistent naming
export const bloodRequest = models.BloodRequest || model("BloodRequest", BloodRequestSchema);


