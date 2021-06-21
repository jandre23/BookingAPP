const Model= require( '../models/index');

const { Appointment, Slot}= Model;


const appointmentController= {	
	all(req, res){
		Appointment.find({}, function(err,slots){if(err){console.log( "no slots to return")}
		console.log(slots);
		res.json(slots);})

	},
	create(req,res){
		var requestbody= req.body;

		// create a new time slot
		
		console.log(req)

		var newSlot= new Slot({
			slot_time: requestbody.slot_time,
			slot_date: requestbody.slot_date,
			created_at: Date.now()
		});

		newSlot.save();



		var newApp= new Appointment({
  			name: requestbody.name,
  			email: requestbody.email,
  			phone: requestbody.phone,
  			slots:newSlot._id,
		});

		newApp.save();

		
		res.json( req.body);
	}


}

module.exports= appointmentController;



