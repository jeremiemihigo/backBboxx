const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    idZone: { type: String, required: true },
    id: { type: Date, required: true },
    denomination: { type: String, required: true, trim: true },
  },
  { timestamps: true },
)
const model = mongoose.model('Zone', schema)
module.exports = model
