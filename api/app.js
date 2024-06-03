const express = require('express');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use('/', todoRoutes); 

app.listen(5000, () => console.log(`Server started listening on port ${5000}`));
