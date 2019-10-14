const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentsSchema = new Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  duration: { type: Number, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  buinsessid: { type: String, required: true },
  customerid: { type: String, required: true },
}, {
  timestamps: true,
});

const Appointment = mongoose.model('appointments', appointmentsSchema);

module.exports = Appointment;