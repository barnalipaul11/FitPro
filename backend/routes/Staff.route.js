import express from "express";
import {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff
} from "../controllers/staff.controller.js";

const staffRoutes = express.Router();

staffRoutes.post("/", createStaff);
staffRoutes.get("/", getAllStaff);
staffRoutes.get("/:id", getStaffById);
staffRoutes.put("/:id", updateStaff);
staffRoutes.delete("/:id", deleteStaff);

export default staffRoutes;