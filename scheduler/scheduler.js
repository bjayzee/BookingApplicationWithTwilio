'use strict';
const moment = require('moment');

const Appointment = require('../models/Appointment');

const controller = require('../controller/appointmentController')

const CronJob = require('cron').CronJob;


const schedulerFactory = function() {
  
  return {
    start: function() {
      new CronJob('25 * * * *', function() {
        console.log('Running Send Notifications Worker for ' +
          moment().format());

        const searchDate = new Date();
        Appointment
          .find()
          .then((appointments) => {

            appointments = appointments.filter((appointment) => {
                    if(Math.round(moment.duration(moment(appointment.time).tz('Africa/Lagos').utc()
                    .diff(moment(searchDate).utc())
                  ).asMinutes()) === 5){

                    var body = `Hi ${appointment.name}. Just a reminder that you have an appointment coming up.`;

                    controller.sendSMS(body, appointment.phoneNumber);
                    controller.sendWhatsappMsg(body, appointment.phoneNumber);
                  }

                });

              }).catch((err) => err.message);
           
            
      }, null, true, '');

    }
  }
}
  
module.exports = schedulerFactory();
