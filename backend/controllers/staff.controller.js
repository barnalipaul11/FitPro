import Staff from "../models/Staff.model.js";
import mongoose from "mongoose";

// Create Staff
export const createStaff = async (req, res) => {
  
  try {
    const newStaff = await Staff.create(req.body);
    console.log("New Staff Created:", newStaff);
    res.status(201).json(newStaff);
  } catch (err) {
    console.error("Error while creating staff:", err);
    res.status(400).json({ error: err.message });
  }
};

// Get all Staff
export const getAllStaff = async (req, res) => {
  try {
    const staffList = await Staff.find();
    res.status(200).json(staffList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get single Staff
export const getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ error: "Staff not found" });
    res.status(200).json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Staff
export const updateStaff = async (req, res) => {
  try {
    const updated = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Delete Staff
export const deleteStaff = async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Staff deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
