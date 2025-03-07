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
  declare createdAt: Date;
  declare updatedAt: Date;
  declare members: string[];
  //declare static associations: {
   // posts: Association<TribeModel, PostModel>;


}

TribeModel.init(
    {
    id: {
        type: DataTypes.NUMBER,
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
        allowNull: true,
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
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    }
    },

    {
        sequelize: conn,
        tableName: "tribes",
        timestamps: false,
    }
);

TribeModel.hasOne(UserModel, {
    sourceKey: 'owner',
    foreignKey: 'username',
    as: 'ownerUser'
});
