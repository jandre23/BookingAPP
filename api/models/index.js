const mongoose = require('mongoose');

const { Schema,model,ObjectId }= mongoose;


const slotSchema = new Schema ({
    slot_time: String,
    slot_date: String,
    created_at: Date
  });

const Slot = model('Slot', slotSchema);

const appointmentSchema = new Schema({
  id: ObjectId,
  name: String,
  email: String,
  phone: Number,
  slots:{type: ObjectId, ref: 'Slot'},
  created_at: Date
});

const Appointment = model('Appointment', appointmentSchema);

module.exports = {
  Appointment, Slot
};

