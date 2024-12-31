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


// Define the Mongoose Schema for BloodRequest
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    age: {type: Number, require: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    image: { type: String, required: true },
    numDon: { type: Number, required: true },
    numReq: { type: Number, required: true },
    address: { type: String, required: true },
    donorStatus: { type: Boolean, required: true }, // age as a number
    bio: { type: String, required: true }, // age as a number
    sex: { type: String, enum: Object.values(Sex), required: true },
    bloodType: { type: String, enum: Object.values(BloodType), required: true },
    role: { type: String, enum: Object.values(Role), default: Role.GUEST },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    collection: 'User'
  }
);

// Export the model, ensuring consistent naming
export const user = models.User || model("User", userSchema);


