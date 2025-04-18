import { Request, Response } from 'express';
import CheckIn from '../../src/models/check_in';
import { createCheckIn } from '../../src/controllers/checkinController';

jest.mock('../../src/models/check_in');

describe('createCheckIn', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      body: {
        "date": "2025-04-17 15:29:13.927+10",
        "member_id": "testid" 
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  it('should create a CheckIn and return 201 with member data', async () => {
    (CheckIn.create as jest.Mock).mockResolvedValue(req.body);

    await createCheckIn(req as Request, res as Response);

    expect(CheckIn.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  it('should return 500 if an error occurs', async () => {
    const error = new Error('DB error');
    (CheckIn.create as jest.Mock).mockRejectedValue(error);

    await createCheckIn(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error creating check-in', error });
  });
});

