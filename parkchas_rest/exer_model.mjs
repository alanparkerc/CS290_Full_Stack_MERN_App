//Chase Parker Fall 2021 parkchas@oregonstate.edu ()
// Get the mongoose object
import mongoose from 'mongoose';

// Prepare to the database exers_db in the MongoDB server running locally on port 3000
mongoose.connect(
    'mongodb://localhost:27017/exercises',
    { useNewUrlParser: true }
);

// Connect to to the database
const db = mongoose.connection;

// The open event is called when the database connection successfully opens
db.once('open', () => {
    console.log('Successfully connected to MongoDB using Mongoose!');
});


const exerSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
	unit: { type: String, required: true },
	date: { type: String, required: true }
});


const Exer = mongoose.model("Exer", exerSchema);


const createExer = async (name, reps, weight, unit, date) => {

    const exer = new Exer({ name: name, reps: reps, weight: weight, unit: unit, date: date });

    return exer.save();
}

const findExers = async () => {
    const query = Exer.find();
    return query.exec();
}

const editExer = async (_id2, name2, reps2, weight2, unit2, date2) => {

	const result1 = await Exer.findById({ _id: _id2 })

	let name1 = result1.name;
	let reps1 = result1.reps;
	let weight1 = result1.weight;
	let unit1 = result1.unit;
	let date1 = result1.date;
	let phoneNumber1 = result1.phoneNumber;
	name1 = name2;
	reps1 = reps2;
	weight1 = weight2;
	unit1 = unit2;
	date1 = date2;
	const result = await Exer.findByIdAndUpdate({_id: _id2}, { name: name1, reps: reps1, weight: weight1, unit: unit1, date: date1});
	return 1;
}

const deleteById = async (req) => {

	let _id2 = req

    const result = await Exer.deleteMany({_id: _id2});
	return result.deletedCount;


}

export { createExer, findExers, editExer, deleteById };