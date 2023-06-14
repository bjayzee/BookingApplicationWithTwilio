const Appointment = require('../models/Appointment');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);


exports.createAppointment = async (req, res, next) => {
    const appointment = new Appointment({
        alias: req.body.alias,
        phoneNumber: req.body.phoneNumber,
        issueType: req.body.issueDetail,
        professionalType: req.body.professionalType,
        time: req.body.time,
        timezone: req.body.timezone
    });
    
    
    try{

        await appointment.save();

        const body =`Hi ${req.body.alias} your booking for a therapy session has been submitted successfully. Pls follow this link to speak to your favorite professional.`;

        this.sendSMS(body, req.body.phoneNumber);
        this.sendWhatsappMsg(body, req.body.phoneNumber);
        
        res.render('success');
    }catch(err){
        res.render('fail');
    }
}

exports.sendSMS = (body, to) =>{
    client.messages
        .create({
            body: body,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: to,
        })
        .then(message => console.log(message.sid + ' for sms'))
        .catch((err) => err.message);
}
exports.sendWhatsappMsg = (body, to) =>{
    client.messages
        .create({
            body: body,
            from: 'whatsapp:'+process.env.TWILIO_WHATSAPP_NUMBER,
            to: 'whatsapp:'+ to,
        })
        .then(message => console.log('whatsapp:'+message.sid));       
}