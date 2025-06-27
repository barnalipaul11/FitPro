import Equipment from "../models/Equipment.model.js";
import { handleError } from "../helpers/handleError.js";
import { validationResult, body, param } from "express-validator";  
import mongoose from "mongoose";

// Validation middlewares
export const validateEquipmentId = [    
    param("id")
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage("Invalid equipment ID"),
    ];
export const validateEquipmentBody = [
    body("name").isString().trim().notEmpty().withMessage("Name is required"),
    body("category")   
        .isString()
        .trim()
        .notEmpty()
        .withMessage("Category is required"),   
    body("location")
        .isString() 
        .trim()
        .notEmpty() 
        .withMessage("Location is required"),
    body("status")  
        .isString()
        .trim()
        .notEmpty()
        .withMessage("Status is required")
        .isIn(["Good", "Needs Maintenance", "Under Repair", "Out of Order"])
        .withMessage("Invalid status"),
    body("notes")
        .optional()
        .isString()
        .trim()
        .withMessage("Notes must be a string"),     
];

export const getEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.find();
        res.status(200).json(equipment);
    } catch (error) {
        const err = handleError(500, "Error fetching equipment");
        res.status(err.statusCode).json({ message: err.message, error });
    }
};

export const createEquipment = async (req, res) => {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = handleError(400, "Validation error");
        return res.status(err.statusCode).json({ message: err.message, errors: errors.array() });
    }
    try {
        const newEquipment = new Equipment(req.body);
        await newEquipment.save();
        res.status(201).json(newEquipment);
    } catch (error) {
        const err = handleError(500, "Error creating equipment");
        res.status(err.statusCode).json({ message: err.message, error });
    }
};

export const updateEquipment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = handleError(400, "Validation error");
        return res.status(err.statusCode).json({ message: err.message, errors: errors.array() });
    }
    try {
        const { id } = req.params;
        const updatedEquipment = await Equipment.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedEquipment) {
            const err = handleError(404, "Equipment not found");
            return res.status(err.statusCode).json({ message: err.message });
        }
        res.status(200).json(updatedEquipment);
    } catch (error) {
        const err = handleError(500, "Error updating equipment");
        res.status(err.statusCode).json({ message: err.message, error });
    }
};  

export const deleteEquipment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = handleError(400, "Validation error");
        return res.status(err.statusCode).json({ message: err.message, errors: errors.array() });
    }
    try {
        const { id } = req.params;
        const deletedEquipment = await Equipment.findByIdAndDelete(id);
        if (!deletedEquipment) {
            const err = handleError(404, "Equipment not found");
            return res.status(err.statusCode).json({ message: err.message });
        }
        res.status(200).json({ message: "Equipment deleted successfully" });
    } catch (error) {
        const err = handleError(500, "Error deleting equipment");
        res.status(err.statusCode).json({ message: err.message, error });
    }
};

export const getEquipmentById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = handleError(400, "Validation error");
    return res.status(err.statusCode).json({ message: err.message, errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const equipment = await Equipment.findById(id);
    if (!equipment) {
      const err = handleError(404, "Equipment not found");
      return res.status(err.statusCode).json({ message: err.message });
    }
    res.status(200).json(equipment);
  } catch (error) {
    const err = handleError(500, "Error fetching equipment by ID");
    res.status(err.statusCode).json({ message: err.message, error });
  }
};
