import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Employee = sequelize.define(
  "Employee",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    employeeCode: { type: DataTypes.STRING(30), allowNull: false, unique: true },
    firstName: { type: DataTypes.STRING(80), allowNull: false },
    lastName: { type: DataTypes.STRING(80), allowNull: false },
    email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    phone: { type: DataTypes.STRING(20), allowNull: true },
    department: { type: DataTypes.STRING(100), allowNull: false },
    designation: { type: DataTypes.STRING(100), allowNull: false },
    salary: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
    joiningDate: { type: DataTypes.DATEONLY, allowNull: false },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
    profileImage: { type: DataTypes.STRING(255), allowNull: true },
  },
  { tableName: "employees", timestamps: true }
);

export default Employee;
