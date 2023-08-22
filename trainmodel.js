const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema({
  trainName: { type: String, required: true },
  trainNumber: { type: String, required: true },
  departureTime: {
    Hours: { type: Number, required: true, min: 0, max: 23 },
    Minutes: { type: Number, required: true, min: 0, max: 59 },
    Seconds: { type: Number, required: true, min: 0, max: 59 },
  },
  seatsAvailable: {
    sleeper: { type: Number, required: true, min: 0 },
    AC: { type: Number, required: true, min: 0 },
  },
  price: {
    sleeper: { type: Number, required: true, min: 0 },
    AC: { type: Number, required: true, min: 0 },
  },
  delayedBy: { type: Number, required: true, min: 0 },
});

const Train = mongoose.model("Train", trainSchema);

module.exports = Train;
