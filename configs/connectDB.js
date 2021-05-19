const mongoose = require("mongoose");
const connectDB = async () => {
  const result = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  console.log(`mongoDB is connected host : ${result.connection.host}`);
};
module.exports = connectDB;
