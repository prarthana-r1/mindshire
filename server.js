const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

app.use('/api/auth', require('./backend/routes/authRoutes'));
app.use('/api/lessons', require('./backend/routes/lessonRoutes'));
app.use('/api/admin', require('./backend/routes/adminRoutes'));  // ✅ Admin Routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
