import { Request, Response } from 'express';
import Member from '../models/member';
import { createMemberWithCheckIns} from '../services/memberService';

export const createMember = async (req: Request, res: Response) => {
  try {
    const member = await Member.create(req.body);
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ message: 'Error creating member', error });
  }
};

export const createBatchMember = async (req: Request, res: Response) => {
  const members = req.body;
  if (!Array.isArray(members)) {
    res.status(400).json({ message: 'Input should be an array of members' });
  }

  try {
    for (const memberData of members) {
      await createMemberWithCheckIns(memberData);
    }
    res.status(201).json({ message: 'Batch creation successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating member', error });
  }
};