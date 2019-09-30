const router = require('express').Router();
let Appointment = require('../models/appointment.model');

router.route('/').get((req, res) => {
  // User.find({$or:[{region: "NA"},{sector:"Some Sector"}]}, function(err, user) 
  Appointment.find({$or:[{provider: req.query.provider}, {username:req.query.provider }]})
    .then(appointments => res.json(appointments))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
const provider = req.body.provider;
const username = req.body.username;
const description = req.body.description;
const duration = Number(req.body.duration);
const date = Date.parse(req.body.date);

const newAppointment = new Appointment({
  provider,
  username,
  description,
  duration,
  date,
});

newAppointment.save()
  .then(() => res.json('appointment added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Appointment.findById(req.params.id)
    .then(appointment => res.json(appointment))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Appointment.findByIdAndDelete(req.params.id)
    .then(() => res.json('Appointment deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Appointment.findById(req.params.id)
    .then(Appointment => {
      Appointment.username = req.body.username;
      Appointment.description = req.body.description;
      Appointment.duration = Number(req.body.duration);
      Appointment.date = Date.parse(req.body.date);

      Appointment.save()
        .then(() => res.json('Appointment updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;