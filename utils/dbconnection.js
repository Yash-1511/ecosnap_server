const mongoose = require('mongoose');
const setupDB = async () => {
  try {
    // Connect to MongoDB
    const db = await mongoose
    .connect(process.env.MONGO_URI, {
    })
    .then(() =>
      console.log(`MongoDB Connected Successfully!`)
    )
    .catch(err => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

module.exports = setupDB;