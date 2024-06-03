const express = require('express');
const { connectToDb } = require("./config/db");
const todoRoutes = require('./routes/todoRoutes');
const app = express();

app.use(express.json({ extended: false }));

connectToDb().then(() => {
    app.listen(5000, () => {
        console.log("App listening on port 5000");
    });
}).catch(err => {
    console.error('Failed to connect to the database', err);
});

app.use('/', todoRoutes);

module.exports = app;
