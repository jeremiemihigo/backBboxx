const mongoose = require("mongoose")

const connectDB = async () => {
  await mongoose.connect(
    "mongodb://127.0.0.1:27017/bboxx",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
      // useCreateIndex: true,
    },
  )
  console.log('MongoDB connect')
}

module.exports = connectDB
