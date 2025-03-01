const express = require('express');
const sequelize = require('./config/db');
const Task = require('./models/Task');
const cors = require('cors');

require("dotenv").config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// Sync database
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use(cors({
  origin: 'http://localhost:3000', // Allow only your React app's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow cookies and credentials
}));

const taskRoutes = require('./routes/taskRoutes');
app.use('/api', taskRoutes);

const logRequests = require('./middlewares/loggerMiddleware');
app.use(logRequests);