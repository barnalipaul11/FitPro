import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
    phone: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    membershipType: {
        type: String,
        enum: ["Basic", "Silver", "Gold", "Platinum"],
        required: true,
    },
    membershipStartDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
    },
}, { timestamps: true });   

const Member = mongoose.model("Member", memberSchema);

export default Member;