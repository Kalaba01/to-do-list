const mongoose = require('mongoose');
// require('dotenv').config(); - ENV file import

module.exports = {
  connectToDb: async () => {
    try {
      await mongoose.connect('mongodb+srv://edinkalaba45:Pw9OCeKYB2iOUWXv@todo.wru78ea.mongodb.net/todo?retryWrites=true&w=majority'); // URL was not changed to process.env.MONGO_URL because testing purposes
    } catch (err) {
      console.error('Connection error', err.message);
      throw err;
    }
  }
};
