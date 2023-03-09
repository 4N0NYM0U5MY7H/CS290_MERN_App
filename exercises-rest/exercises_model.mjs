import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

const exerciseShema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});

const Exercise = mongoose.model("Exercise", exerciseShema);

/**
 * @param {String} unit "kgs" or "lbs"
 * @param {String} date "MM-DD-YY" e.g. "07-30-21"
 */
const createExercise = async (name, reps, weight, unit, date) => {
    const exercises = Exercise({
        name: name,
        reps: reps,
        weight: weight,
        unit: unit,
        date: date
    });
    return exercises.save();
};

const findExercises = async (filter, projection, limit) => {
    const query = Exercise.find(filter)
        .select(projection)
        .limit(limit);
    return query.exec();
};

const findExerciseById = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec();
};

/**
 * @param {String} unit "kgs" or "lbs"
 * @param {String} date "MM-DD-YY" e.g. "07-30-21"
 */
const updateExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercise.replaceOne(
        { _id: _id },
        {
            name: name,
            reps: reps,
            weight: weight,
            unit: unit,
            date: date
        });
    return result.modifiedCount;
};

const deleteExercise = async (_id) => {
    const result = await Exercise.deleteOne({ _id: _id });
    return result.deletedCount;
};

export { createExercise, findExercises, findExerciseById, updateExercise, deleteExercise };