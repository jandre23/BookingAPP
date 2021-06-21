const mongoose= require('mongoose');

const {Appointment,Slot} = require('./models/index');

mongoose.Promisee= global.Promise;

//const {MongoClient} = require('mongodb');

const uri = "mongodb+srv://andre23:nylegend23@cluster0.mprrz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//const client = new MongoClient(uri,{ useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true }).then((db)=>{console.log("success...");}).catch((err)=>{console.log(err);})

/*


var newSlot = new Slot ({
      slot_time: '1',
      slot_date: '2019-01-01',
      created_at: Date.now()
    });

*/


/*
newSlot.save((err,results)=>{
	if(err){console.log( err);
		}
console.log(results)
});

*/

//Slot.find({},(err,results)=>{console.log(results)})
//Slot.deleteMany({},(err,res)=>{console.log(res)});
//Appointment.find({},(err,results)=>{console.log(results)});
//Appointment.deleteMany({},(err,res)=>{console.log(res)});

let slot_date= '2019-01-01';

Slot.find({})
        .where('slot_date').equals(slot_date)
        .exec((err, slots) => {console.log(slots)});
      
/*



newSlot.save((err,results)=>{
	if(err){console.log( err);
		}

});
*/

//mongoose.connection.close();




