const express = require('express');

const cors = require('cors');

const authRoutes = require('./routes/authRoutes');

const projectRoutes = require('./routes/projectRoutes');

const milestoneRoutes = require('./routes/milestoneRoutes');

const alertRoutes = require('./routes/alertRoutes');

const errorMiddleware = require(
  './middleware/errorMiddleware'
);

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/projects', projectRoutes);

app.use('/api/milestones', milestoneRoutes);

app.use('/api/alerts', alertRoutes);

app.use(errorMiddleware);

module.exports = app;