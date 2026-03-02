require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const roleRoutes = require('./routes/roleRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect Database
connectDB();

// Middleware để parse body rquest
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing
app.use('/api/roles', roleRoutes);
app.use('/api/users', userRoutes);

// Route mặc định
app.get('/', (req, res) => {
    res.send('API Node.js với Mongoose đang chạy!');
});

// Chạy server
app.listen(PORT, () => {
    console.log(`Server đang chạy trên port: ${PORT}`);
});
