import express from 'express';
import {
  getEquipment,
  createEquipment,
  updateEquipment,
  deleteEquipment,
  validateEquipmentId,
  validateEquipmentBody,
} from '../controllers/equipment.controller.js';

const EquipmentRoute = express.Router();
EquipmentRoute.get('/', getEquipment);
EquipmentRoute.post('/', validateEquipmentBody, createEquipment);   
EquipmentRoute.put('/:id', validateEquipmentId, validateEquipmentBody, updateEquipment);
EquipmentRoute.delete('/:id', validateEquipmentId, deleteEquipment);