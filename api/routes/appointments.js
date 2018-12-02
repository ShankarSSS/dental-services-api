const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');
const Appointment = require('../models/appointment');




routes.get('/List', function(req, res) {
    Appointment.find({}, function(err, appointments) {
      var appointmentMap = {};  
      appointments.forEach(function(appointment) {
        appointmentMap[appointment._id] = appointment;
      });  
      res.send(appointmentMap);  
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
    // var appointment_date = new Date(req.body.appointment_date);
    // var appointment_start_date = new Date(req.body.appointment_date);
    // var appointment_end_date = new Date(req.body.appointment_date);
    // var created_date = new Date(req.body.appointment_date);

    
    const appointment = new Appointment({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email,
        source: req.body.source,
        appointment_date:req.body.appointment_date,
        appointment_start_date: req.body.appointment_start_date,
        appointment_end_date:req.body.appointment_end_date,
        created_date:req.body.created_date,
        created_by: req.body.created_by       
    });   

    console.log('-----------------------------------')
    console.log(appointment);
    console.log('-----------------------------------')
Appointment.find({appointment_start_date: req.body.appointment_start_date})
.exec()
.then(doc => {
    console.log(doc);
    if(doc.length > 0)
    {
        //409 Conflict
        res.status(409).json({Message:'Already Booked'});
    }
    else{
        appointment.save()
        .then(result => {
            //console.log(result);
            res.status(200).json({Message:'Success'});
        })
        .catch(err =>{
           // console.log(err)
           res.status(500).json({ error: err });
        }
        );    
    }
    //res.status(200).json(doc);
})
.catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
});
  
}
catch(err){ 
    console.log('4');   
    console.log(err);
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
