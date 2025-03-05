import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey } from "sequelize";
import { conn } from "./conn";
import { UserModel } from "./user.db";

export class TribeModel extends Model<InferAttributes<TribeModel>, InferCreationAttributes<TribeModel>> {
  declare title: string;
  declare id: CreationOptional<number>;
  declare description: string;
  declare userName: ForeignKey<UserModel['username']>;
  declare createdAt: string;
  declare updatedAt: string;
}