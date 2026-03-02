const User = require('../models/User');

// Lấy toàn bộ User
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ isDeleted: false }).populate('role');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy User theo ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id, isDeleted: false }).populate('role');
        if (!user) return res.status(404).json({ message: 'User không tồn tại hoặc đã bị xoá' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tạo User mới
exports.createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Cập nhật User
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false },
            req.body,
            { new: true }
        );
        if (!updatedUser) return res.status(404).json({ message: 'User không tồn tại hoặc đã bị xoá' });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Xoá mềm User (Soft delete)
exports.softDeleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );
        if (!deletedUser) return res.status(404).json({ message: 'User không tồn tại' });
        res.status(200).json({ message: 'Xoá mềm User thành công' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Kích hoạt User (/enable)
exports.enableUser = async (req, res) => {
    try {
        const { email, username } = req.body;
        
        if (!email || !username) {
            return res.status(400).json({ message: "Vui lòng cung cấp email và username" });
        }

        const user = await User.findOneAndUpdate(
            { email, username, isDeleted: false },
            { status: true },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "Thông tin không chính xác hoặc user không tồn tại" });
        }

        res.status(200).json({ message: "Kích hoạt tài khoản thành công", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Vô hiệu hóa User (/disable)
exports.disableUser = async (req, res) => {
    try {
        const { email, username } = req.body;
        
        if (!email || !username) {
            return res.status(400).json({ message: "Vui lòng cung cấp email và username" });
        }

        const user = await User.findOneAndUpdate(
            { email, username, isDeleted: false },
            { status: false },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "Thông tin không chính xác hoặc user không tồn tại" });
        }

        res.status(200).json({ message: "Vô hiệu hoá tài khoản thành công", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
