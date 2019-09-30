const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentsSchema = new Schema({
  provider: { type: String, required: true },
  username: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Appointment = mongoose.model('appointments', appointmentsSchema);

module.exports = Appointment;