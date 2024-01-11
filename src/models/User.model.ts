import sequelize from "../db/connect";
import { DataTypes, Model } from "sequelize";
import { User } from "../interfaces/User.interface";
import * as bcrypt from "bcryptjs";

class UserModel extends Model<User> implements User {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public comparePassword!: (password: string) => Promise<boolean>;
}

const User = UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "users", sequelize }
);

User.beforeCreate(async (user) => {
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(user.password, salt);
});

User.prototype.comparePassword = async function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

export { User };
