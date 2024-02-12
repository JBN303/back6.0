// In appointmentModel.js

const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  patientName: String,
  age: Number,
  contactNo: Number,
  email: String,
  purpose: String,
  
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
