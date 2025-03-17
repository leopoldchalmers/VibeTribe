import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey } from "sequelize";
import { conn } from "./conn";
import { Association } from "sequelize";
import { UserModel } from "./user.db";
import { PostModel } from "./post.db";

export class TribeModel extends Model<InferAttributes<TribeModel>, InferCreationAttributes<TribeModel>> {
  declare title: string;
  declare id: CreationOptional<number>;  
  declare description: string;
  declare owner: ForeignKey<UserModel['username']>;
  declare createdAt: Date;
  declare updatedAt: Date;
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
        onDelete: "CASCADE", 
        onUpdate: "CASCADE"    
    },
    
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
    
    },

    {
        sequelize: conn,
        tableName: "tribes",
        timestamps: false,
    }
);

TribeModel.belongsTo(UserModel, {
    foreignKey: 'owner',
    as: 'ownerUser'
});