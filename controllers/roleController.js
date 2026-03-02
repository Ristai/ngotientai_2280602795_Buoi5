const Role = require('../models/Role');

// Lấy danh sách Role (không bao gồm role đã bị xoá mềm)
exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find({ isDeleted: false });
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy Role theo ID
exports.getRoleById = async (req, res) => {
    try {
        const role = await Role.findOne({ _id: req.params.id, isDeleted: false });
        if (!role) return res.status(404).json({ message: 'Role không tồn tại hoặc đã bị xoá' });
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Thêm Role mới
exports.createRole = async (req, res) => {
    try {
        const newRole = new Role(req.body);
        const savedRole = await newRole.save();
        res.status(201).json(savedRole);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Cập nhật Role
exports.updateRole = async (req, res) => {
    try {
        const updatedRole = await Role.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false },
            req.body,
            { new: true }
        );
        if (!updatedRole) return res.status(404).json({ message: 'Role không tồn tại hoặc đã bị xoá' });
        res.status(200).json(updatedRole);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Xoá mềm Role (Soft Delete)
exports.softDeleteRole = async (req, res) => {
    try {
        const deletedRole = await Role.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );
        if (!deletedRole) return res.status(404).json({ message: 'Role không tồn tại' });
        res.status(200).json({ message: 'Xoá mềm Role thành công' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
