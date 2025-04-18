import { createBatchMember, createMember } from '../../src/controllers/memberController';
import { Request, Response } from 'express';
import { createMemberWithCheckIns } from '../../src/services/memberService';
import Member from '../../src/models/member';

jest.mock('../../src/services/memberService');
jest.mock('../../src/models/member');

describe('createMember', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      body: { member_id: 'M123', name: 'Test User' }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  it('should create a member and return 201 with member data', async () => {
    (Member.create as jest.Mock).mockResolvedValue(req.body);

    await createMember(req as Request, res as Response);

    expect(Member.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  it('should return 500 if an error occurs', async () => {
    const error = new Error('DB error');
    (Member.create as jest.Mock).mockRejectedValue(error);

    await createMember(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error creating member', error });
  });
});

describe('createBatchMember', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should return 400 if input is not an array', async () => {
    req.body = { name: 'Invalid' };

    await createBatchMember(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Input should be an array of members' });
  });

  it('should process batch and return 201 on success', async () => {
    req.body = [
      { member_id: 'M001', name: 'Ali', check_ins: ['2025-04-01'] },
      { member_id: 'M002', name: 'Zara' },
    ];

    await createBatchMember(req as Request, res as Response);

    expect(createMemberWithCheckIns).toHaveBeenCalledTimes(2);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Batch creation successful' });
  });

  it('should return 500 on error', async () => {
    (createMemberWithCheckIns as jest.Mock).mockRejectedValue(new Error('DB Error'));
    req.body = [{ source_id: 'M003', name: 'Error Test' }];

    await createBatchMember(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error creating member', error: expect.any(Error) });
  });
});
