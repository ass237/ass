import {Schema, model, models} from "mongoose";


// Define the schema for the BloodBank model
const BloodBankSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null },
    A_positive: { type: Number, required: true },
    A_negative: { type: Number, required: true },
    B_positive: { type: Number, required: true },
    B_negative: { type: Number, required: true },
    AB_positive: { type: Number, required: true },
    AB_negative: { type: Number, required: true },
    O_positive: { type: Number, required: true },
    O_negative: { type: Number, required: true },
  },
  {
    timestamps: true,
    collection: 'BloodBank' // Automatically create `createdAt` and `updatedAt` fields
  }
);
export const bloodBank = models.BloodBank || model('BloodBank',BloodBankSchema );

