const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5174', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type'], // Allowed headers
  credentials: true, // Allow credentials (e.g., cookies)
};

app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/lessons', require('./routes/lessonRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));  // ✅ Admin Routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
