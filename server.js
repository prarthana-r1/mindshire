require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/lessons', require('./routes/lessonRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
