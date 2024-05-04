const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const db = require('./config/db');
const ApiError = require('./utils/ApiError');
const { globalErrorHandler } = require('./middlewares/error.middleware');

// Import Routes
const { userRouter } = require('./routes');

// Pre Request Middlewares
app.use(cors());
app.use(express.json());


// Configuration
dotenv.config();
db.config();

// Constants
const PORT = process.env.PORT || 3333;


// Routes
app.get('/api', (req, res) => res.json({ msg: 'Welcome to Netflix-GPT' }));
app.use('/api/v1/users', userRouter);

// Error Handling
app.all('/api/*', (req, res, next) => next(new ApiError(404, "Oops! Looks like you're lost.")));
app.use(globalErrorHandler);

// Server Frontend
app.use(express.static(path.join(__dirname, 'public', 'dist')));
app.use((req, res) => res.sendFile(path.join(__dirname, 'public', 'dist', 'index.html')));

// Server
app.listen(PORT, () => console.log(`Server running @${PORT}`));