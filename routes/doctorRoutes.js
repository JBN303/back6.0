const express = require('express');
const Doctor = require('../model/doctorModel');
const Appointment = require('../model/appointmentModel'); 
const router = express.Router();

router.get('/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/doctors/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const doctors = await Doctor.findById(id);
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/dnew', async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update doctor profile
router.put('/doctors/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json(updatedDoctor);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete doctor profile
router.delete('/doctors/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(id);
    if (!deletedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    res.status(500).send(err);
  }
});


router.put('/doctors/toggle/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Toggle the status
    doctor.status = doctor.status === 'active' ? 'inactive' : 'active';

    const updatedDoctor = await doctor.save();

    res.status(200).json(updatedDoctor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/appointments/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Create a new appointment
    const appointment = new Appointment({
      doctorId: id,
      patientName: req.body.patientName,
      age: req.body.age,
      contactNo: req.body.contactNo,
      email: req.body.email,
      purpose: req.body.purpose,
    });

    const savedAppointment = await appointment.save();

    res.status(200).json(savedAppointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/appointments/:doctorId', async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointments = await Appointment.find({ doctorId });
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});





module.exports = router;