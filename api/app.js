const express = require('express');
const cors = require('cors');
const { connectToDb } = require("./config/db");
const todoRoutes = require('./routes/todoRoutes');
const app = express();

app.use(cors());

app.use(express.json({ extended: false }));

app.use('/', todoRoutes);

connectToDb().then(() => {
    app.listen(5000, () => {
        console.log("App listening on port 5000");
    });
}).catch(err => {
    console.error('Failed to connect to the database', err);
});

module.exports = app;
