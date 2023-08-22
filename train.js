const mongoose = require('mongoose')

const trainSchema = new mongoose.Schema({
  companyName: String,
  ownerName: String,
  rollNo: String,
  ownerEmail: String,
  accesscode: String,
});

module.exports = mongoose.model('Train', trainSchema);
