import { Request, Response } from 'express';
import CheckIn from '../models/check_in';

export const createCheckIn = async (req: Request, res: Response) => {
  try {
    const checkIn = await CheckIn.create(req.body);
    res.status(201).json(checkIn);
  } catch (error) {
    res.status(500).json({ message: 'Error creating check-in', error });
  }
};
