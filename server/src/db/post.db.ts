import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, Association } from "sequelize";
import { conn } from "./conn";
import { TribeModel } from "./tribe.db";
import { UserModel } from "./user.db";

export class PostModel extends Model<InferAttributes<PostModel>, InferCreationAttributes<PostModel>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare description: string;
  declare author: ForeignKey<UserModel['username']>;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare likes: number;
  declare tribe: ForeignKey<TribeModel['id']>;
  declare songLink: string;
}
/**
 * PostModel is a model that represents a post in the database 
 */

PostModel.init(
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
            type: DataTypes.STRING,
            allowNull: false
        },

        author: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: UserModel,
                key: 'username'
            }

            

        }, 
        
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        },

        likes: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        tribe: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: TribeModel,
                key: 'id'
            }
        },

        songLink: {
            type: DataTypes.STRING,
            allowNull: true
        }

        
    },

    {
        sequelize: conn,
        tableName: "posts",
        timestamps: false, 
    }
);

PostModel.belongsTo(UserModel, {
    foreignKey: 'author',
    as: 'authorUser'
});
PostModel.belongsTo(TribeModel, {
    foreignKey: 'tribe',
    as: 'tribeModel'
});