import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';

class Member extends Model {
  public id!: string;
  public source_id!: string;
  public name!: string;
  public engage_status!: 'HIGHLY_ENGAGED' | 'MODERATELY_ENGAGED' | 'AT_RISK';
}

Member.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    source_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    engage_status: {
      type: DataTypes.STRING,
      defaultValue: 'AT_RISK',
    },
  },
  {
    sequelize,
    modelName: 'Member',
    tableName: 'members',
  }
);

export default Member;
