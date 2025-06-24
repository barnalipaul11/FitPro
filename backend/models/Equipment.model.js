import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true, 
    },
    category: {
        type: String,   
        enum: ["Cardio", "Strength", "Functional", "Free Weights", "Accessories"],
        required: true,
    },
    status: {
        type: String,
        enum: ["Good", "Needs Maintenance", "Under Repair", "Out of Order"],
        default: "Good",
    },
    lastMaintenanceDate: {
        type: Date, 
        default: Date.now,
    },
    notes: {
        type: String,
        default: "",
    },
}, 
{timestamps: true,})

const Equipment = mongoose.model("Equipment", equipmentSchema);

export default Equipment;