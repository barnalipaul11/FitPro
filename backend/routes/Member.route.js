import express from 'express';
import {
  getMembers,
  createMember,
  updateMember,
  deleteMember,
  validateMemberId,
  validateMemberBody,
} from '../controllers/member.controller.js';

const MemberRoute = express.Router();

MemberRoute.get('/', getMembers);
MemberRoute.post('/', validateMemberBody, createMember);
MemberRoute.put('/:id', validateMemberId, validateMemberBody, updateMember);
MemberRoute.delete('/:id', validateMemberId, deleteMember);

export default MemberRoute;