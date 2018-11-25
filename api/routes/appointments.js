const express = require('express');
const routes = express.Router();
const Appointment = require('../models/appointment');

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

    const appointment = new Appointment({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email,
        source: req.body.source,
        appointment_date: req.body.appointment_date,
        appointment_start_date: req.body.appointment_start_date,
        appointment_end_date: req.body.appointment_end_date,
        created_date: req.body.created_date,
        created_by: req.body.created_by,
        product_id: req.body.product_id
    });   


    product.save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));

    res.status(200).json({
        'Message': '/appointment handled in post',
        appointment: appointment
    });
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
