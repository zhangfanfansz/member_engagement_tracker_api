import { createMemberWithCheckIns } from '../../src/services/memberService';
import Member from '../../src/models/member';
import CheckIn from '../../src/models/check_in';

jest.mock('../../src/models/member');
jest.mock('../../src/models/check_in');

describe('createMemberWithCheckIns', () => {
  const memberData = {
    member_id: 'M001',
    name: 'Ali',
    check_ins: ['2025-04-17 15:29:13.927+10'],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a member and associated check-ins', async () => {
    const member = { id: '123', source_id: 'M001', name: 'Ali' };
    (Member.create as jest.Mock).mockResolvedValue(member);
    (CheckIn.create as jest.Mock).mockResolvedValue({});

    const result = await createMemberWithCheckIns(memberData);

    expect(Member.create).toHaveBeenCalledWith({ source_id: memberData.member_id, name: memberData.name });
    expect(CheckIn.create).toHaveBeenCalledTimes(1);
    expect(CheckIn.create).toHaveBeenCalledWith({
      member_id: '123',
      date: '2025-04-17 15:29:13.927+10',
    });
    expect(result).toEqual(member);
  });

  it('should create a member without check-ins if no check_ins are provided', async () => {
    const dataWithoutCheckIns = {
      member_id: 'M002',
      name: 'Zara',
    };
    
    const member = { id: '124', source_id: 'M002', name: 'Zara' };
    (Member.create as jest.Mock).mockResolvedValue(member);

    const result = await createMemberWithCheckIns(dataWithoutCheckIns);

    expect(Member.create).toHaveBeenCalledWith({ source_id: dataWithoutCheckIns.member_id, name: dataWithoutCheckIns.name });
    expect(CheckIn.create).not.toHaveBeenCalled();
    expect(result).toEqual(member);
  });

  it('should throw an error if creating the member fails', async () => {
    const error = new Error('Failed to create member');
    (Member.create as jest.Mock).mockRejectedValue(error);

    try {
      await createMemberWithCheckIns(memberData);
    } catch (err) {
      expect(err).toEqual(error);
    }
  });

  it('should throw an error if creating a check-in fails', async () => {
    const member = { id: '125', source_id: 'M003', name: 'John' };
    (Member.create as jest.Mock).mockResolvedValue(member);
    const checkInError = new Error('Failed to create check-in');
    (CheckIn.create as jest.Mock).mockRejectedValueOnce(checkInError);

    try {
      await createMemberWithCheckIns(memberData);
    } catch (err) {
      expect(err).toEqual(checkInError);
    }
  });
});
