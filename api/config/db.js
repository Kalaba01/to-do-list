const mongoose = require("mongoose");
require("dotenv").config();

module.exports = {
  connectToDb: async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL);
    } catch (err) {
      console.error("Connection error", err.message);
      throw err;
    }
  }
};
