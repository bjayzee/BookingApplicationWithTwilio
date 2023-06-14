const mongoose = require("mongoose");

var AppointmentSchema = new mongoose.Schema({
    alias:String,
    phoneNumber: String,
    notification : Number,
    issueType: String,
    professionalType: String,
    time: {type: Date, index: true},
    timezone: String,  
  }, {timestamps: true});

  const Appointment = mongoose.model('appointment', AppointmentSchema);

  module.exports = Appointment;  