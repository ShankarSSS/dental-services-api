const express = require('express');
const routes = express.Router();
const Appointment = require('../models/appointment');
const mongoose = require('mongoose');


routes.get('/', (req, res, next) => {
    res.status(200).json({
        'Message': '/appointment handled in get'
    });
});

routes.get('/:appointmentId', (req, res, next) => {
    const id=req.params.appointmentId;
    res.status(200).json({
        'Message': 'appointment Id is '+id
    });
});

routes.post('/', (req, res, next) => {   
try{
    var appointment_date = new Date(req.body.appointment_date);
    var appointment_start_date = new Date(req.body.appointment_date);
    var appointment_end_date = new Date(req.body.appointment_date);
    var created_date = new Date(req.body.appointment_date);


    const appointment = new Appointment({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email,
        source: req.body.source,
        appointment_date:appointment_date,
        appointment_start_date: appointment_start_date,
        appointment_end_date:appointment_end_date,
        created_date:created_date,
        created_by: req.body.created_by       
    });   


    appointment.save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));

    res.status(200).json({
        'Message': '/appointment shankar handled in post',
        appointment: appointment
    });
}
catch(err){    
    res.status(500).json({
        'Message': err
    });
}
    
});

routes.patch('/:appointmentId', (req, res, next) => {
    const id=req.params.appointmentId;
    res.status(200).json({
        'Message': 'Update appointment Id is '+id
    });
});

routes.delete('/:appointmentId', (req, res, next) => {
    const id=req.params.appointmentId;
    res.status(200).json({
        'Message': 'Delete appointment Id is '+id
    });
});


module.exports=routes;
