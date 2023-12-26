const mongoose = require('mongoose');
const websiteDb = require("../../databses/websiteDb");

const appointmentSchema = new mongoose.Schema({
  firstname: {type: String},
  lastname: {type: String},
  email: {type: String},
  service: {type: String},
  company: { type: String},
  date: { type: Date},
  time: { type: String},
  number: { type: String},
  message: { type: String},
  country: { type: String},
});

const Appointment = websiteDb.model('Appointment', appointmentSchema);

module.exports = Appointment;