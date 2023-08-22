const mongoose = require("mongoose");

const trainDetailsSchema = new mongoose.Schema({
  trainNumber: { type: String, required: true, unique: true },
  apertureTime: {
    Hours: { type: Number, required: true },
    Minutes: { type: Number, required: true },
    Seconds: { type: Number, required: true },
  },
  stable: {
    Imper: { type: Number, required: true },
    De: { type: Number, required: true },
    ACT: { type: Number, required: true },
    Kleeper: { type: Number, required: true },
  },
});

const TrainDetails = mongoose.model("TrainDetails", trainDetailsSchema);

module.exports = TrainDetails;
