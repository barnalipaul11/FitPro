import Member from '../models/member.model.js';
import { handleError } from '../helpers/handleError.js';
import { validationResult, body, param } from 'express-validator';
import mongoose from 'mongoose';

// Validation middlewares
export const validateMemberId = [
  param('id').custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('Invalid member ID'),
];

export const validateMemberBody = [
  body('name').isString().trim().notEmpty().withMessage('Name is required'),
  // Add more field validations as needed
];

export const getMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (error) {
    const err = handleError(500, 'Error fetching members');
    res.status(err.statusCode).json({ message: err.message, error });
  }
};

export const createMember = async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = handleError(400, 'Validation error');
    return res.status(err.statusCode).json({ message: err.message, errors: errors.array() });
  }
  try {
    const newMember = new Member(req.body);
    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    const err = handleError(500, 'Error creating member');
    res.status(err.statusCode).json({ message: err.message, error });
  }
};

export const updateMember = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = handleError(400, 'Validation error');
    return res.status(err.statusCode).json({ message: err.message, errors: errors.array() });
  }
  try {
    const { id } = req.params;
    const updatedMember = await Member.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedMember) {
      const err = handleError(404, 'Member not found');
      return res.status(err.statusCode).json({ message: err.message });
    }
    res.status(200).json(updatedMember);
  } catch (error) {
    const err = handleError(500, 'Error updating member');
    res.status(err.statusCode).json({ message: err.message, error });
  }
};

export const deleteMember = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = handleError(400, 'Validation error');
    return res.status(err.statusCode).json({ message: err.message, errors: errors.array() });
  }
  try {
    const { id } = req.params;
    const deletedMember = await Member.findByIdAndDelete(id);
    if (!deletedMember) {
      const err = handleError(404, 'Member not found');
      return res.status(err.statusCode).json({ message: err.message });
    }
    res.status(200).json({ message: 'Member deleted successfully' });
  } catch (error) {
    const err = handleError(500, 'Error deleting member');
    res.status(err.statusCode).json({ message: err.message, error });
  }
};