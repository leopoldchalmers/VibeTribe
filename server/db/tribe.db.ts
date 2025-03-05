import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey } from "sequelize";
import { conn } from "./conn";
import { Association } from "sequelize";
import { UserModel } from "./user.db";
import { PostModel } from "./post.db";

export class TribeModel extends Model<InferAttributes<TribeModel>, InferCreationAttributes<TribeModel>> {
  declare title: string;
  declare id: number;
  declare description: string;
  declare owner: ForeignKey<UserModel['username']>;
  declare createdAt: string;
  declare updatedAt: string;
  declare members: ForeignKey<UserModel['username']>;
  //declare static associations: {
   // posts: Association<TribeModel, PostModel>;
}

TribeModel.init(
    {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type : DataTypes.STRING,
        allowNull: false
    },
    owner: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'username'   
        },
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    },

    members: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'username'
        }
    }
    },

    {
        sequelize: conn,
        tableName: "tribes",
        timestamps: false,
    }
);

    TribeModel.hasOne(UserModel, {
        sourceKey: 'username',
        foreignKey: 'owner',
        as: 'owner'
    });
