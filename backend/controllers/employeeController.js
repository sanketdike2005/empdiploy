import { Op } from "sequelize";
import { Employee } from "../models/index.js";

export const getEmployees = async (req, res, next) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);
    const offset = (page - 1) * limit;
    const search = (req.query.search || "").trim();
    const department = (req.query.department || "").trim();

    const where = {};

    if (search) {
      where[Op.or] = [
        { firstName: { [Op.like]: `%${search}%` } },
        { lastName: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { employeeCode: { [Op.like]: `%${search}%` } },
      ];
    }

    if (department) where.department = department;

    const { count, rows } = await Employee.findAndCountAll({
      where,
      limit,
      offset,
      order: [["id", "DESC"]],
    });

    res.json({
      employees: rows,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (error) {
    next(error);
  }
};

export const createEmployee = async (req, res, next) => {
  try {
    const {
      employeeCode,
      firstName,
      lastName,
      email,
      phone,
      department,
      designation,
      salary,
      joiningDate,
      status,
    } = req.body;

    if (!employeeCode || !firstName || !lastName || !email || !department || !designation || !joiningDate) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const employee = await Employee.create({
      employeeCode,
      firstName,
      lastName,
      email,
      phone,
      department,
      designation,
      salary: salary || 0,
      joiningDate,
      status: status || "active",
      profileImage: req.file ? `/uploads/${req.file.filename}` : null,
    });

    res.status(201).json({ message: "Employee created", employee });
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    const allowed = [
      "employeeCode", "firstName", "lastName", "email", "phone",
      "department", "designation", "salary", "joiningDate", "status"
    ];

    for (const key of allowed) {
      if (req.body[key] !== undefined) employee[key] = req.body[key];
    }

    if (req.file) employee.profileImage = `/uploads/${req.file.filename}`;

    await employee.save();

    res.json({ message: "Employee updated", employee });
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    await employee.destroy();
    res.json({ message: "Employee deleted" });
  } catch (error) {
    next(error);
  }
};

export const getDashboardStats = async (req, res, next) => {
  try {
    const totalEmployees = await Employee.count();
    const activeEmployees = await Employee.count({ where: { status: "active" } });
    const inactiveEmployees = await Employee.count({ where: { status: "inactive" } });

    res.json({ totalEmployees, activeEmployees, inactiveEmployees });
  } catch (error) {
    next(error);
  }
};
