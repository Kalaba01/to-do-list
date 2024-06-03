const mongoose = require('mongoose');

module.exports = {
  connectToDb: async () => {
    try {
      await mongoose.connect('mongodb+srv://edinkalaba45:Pw9OCeKYB2iOUWXv@todo.wru78ea.mongodb.net/todo?retryWrites=true&w=majority');
    } catch (err) {
      console.error('Connection error', err.message);
      throw err;
    }
  }
};
