const express = require('express');
const router = express.Router();

const appointmentController = require('../../controllers/appointments')
const slotController = require('../../controllers/slots')

router.get('/appointments', appointmentController.all);
router.get('/retrieveSlots', slotController.all);
router.post('/appointmentCreate', appointmentController.create);
router.get('/removeAllSlots', slotController.remove);
router.post('/findDate', slotController.findByDate);




module.exports = router;