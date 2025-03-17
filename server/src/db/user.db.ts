 import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from "sequelize";
import { Association } from "sequelize";
import { conn } from "./conn";
import { TribeModel } from "./tribe.db";
import {PostModel} from "./post.db"

export class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  declare username: string;
  declare email: string;
  declare password: string;
  declare static associations: {
    tribes: Association<UserModel, TribeModel>;
    posts: Association<UserModel, PostModel>;
  };
}
/**
 * UserModel is a model that represents a user in the database
 */

UserModel.init(
  {
    username: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
      },
  },
  {
    sequelize: conn,
    tableName: "users",
    timestamps: false,
  }
);

