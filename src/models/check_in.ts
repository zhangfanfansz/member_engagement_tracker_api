import { Model, DataTypes, Op } from 'sequelize';
import sequelize from '../db';
import Member from './member';

class CheckIn extends Model {
  public id!: string;
  public date!: Date;
  public member_id!: string;
}

CheckIn.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    member_id: {
      type: DataTypes.UUID,
      references: {
        model: Member,
        key: 'id',
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'CheckIn',
    tableName: 'check_ins',
  }
);

CheckIn.afterCreate(async (checkIn) => {
  const member = await Member.findByPk(checkIn.member_id);
  if (member) {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentCheckIns = await CheckIn.count({
      where: {
        member_id: checkIn.member_id,
        date: {
          [Op.gte]: sevenDaysAgo,
        },
      },
    });

    let engage_status = 'AT_RISK';
    if (recentCheckIns >= 3 ){
      engage_status = 'HIGHLY_ENGAGED'
    }else if (recentCheckIns >= 1 && recentCheckIns <= 2){
      engage_status = 'MODERATELY_ENGAGED'
    }else {
      engage_status = 'AT_RISK'
    }
    try {
      await member.update({ engage_status: engage_status });
    } catch (error) {
      console.error('Error updating member engage status:', error);
    }
  }
});

export default CheckIn;
