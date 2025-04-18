import Member from '../models/member';
import CheckIn from '../models/check_in';

export const createMemberWithCheckIns = async (data: {
  member_id: string;
  name: string;
  check_ins?: string[];
}) => {
  const { member_id, name, check_ins } = data;
  const member = await Member.create({ source_id: member_id, name: name });
  if (Array.isArray(check_ins)) {
    for (const date of check_ins) {
      await CheckIn.create({ member_id: member.id, date: date });
    }
  }
  return member;
};
