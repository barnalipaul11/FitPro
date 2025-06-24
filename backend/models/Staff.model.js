import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  role: {
    type: String,
    enum: ["Personal Trainer", "Yoga Instructor","Nutritionist","Maintenance", "Gym Manager", "Receptionist"],
    required: true,
  },
  shift: {
    start: { type: String, required: true },
    end: { type: String, required: true },
  },
  salary: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Active", "Inactive","On Leave"],
    default: "Active",
  },
}, { timestamps: true });

const Staff = mongoose.model("Staff", staffSchema);
export default Staff;
