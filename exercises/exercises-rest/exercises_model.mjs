import mongoose from "mongoose";
import "dotenv/config";

mongoose.set("sanitizeFilter", true);
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

const exerciseShema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true,
        min: [1, "{VALUE} is not greater than 0."],
        max: [999999, "{VALUE} is greater than max reps."]
    },
    weight: {
        type: Number,
        required: true,
        min: [1, "{VALUE} is not greater than 0."],
        max: [999999, "{VALUE} is greater than max weight."]
    },
    unit: {
        type: String,
        required: true,
        enum: {
            values: ["kgs", "lbs"],
            message: "{VALUE} is not supported.",
            description: "Must be 'kgs' or 'lbs'."
        },
        lowercase: true
    },
    date: {
        type: String,
        required: true,
        match: /^(((0)\d)|((1)[0-2]))(-)([0-2]\d|(3)[0-1])(-)\d{2}$/
    }
});

const Exercise = mongoose.model("Exercise", exerciseShema);

/**
 * @param {String} name
 * @param {Number} reps Integer > 0
 * @param {Number} weight Real number > 0
 * @param {String} unit "kgs" or "lbs"
 * @param {String} date "MM-DD-YY" e.g. "07-30-21"
 * @returns {Promise} Resolves to the JavaScript object for the docuement created by calling save.
 */
const createExercise = async (name, reps, weight, unit, date) => {
    const exercises = Exercise(
        {
            name: name,
            reps: reps,
            weight: weight,
            unit: unit,
            date: date
        });
    return exercises.save();
};

/**
 * @param {Object} filter 
 * @param {String} projection 
 * @param {Number} limit 
 * @returns {Promise}
 */
const findExercises = async (filter, projection, limit) => {
    const query = Exercise.find(filter)
        .select(projection)
        .limit(limit);
    return query.exec();
};

/**
 * @param {String} _id 
 * @returns {Promise}
 */
const findExerciseById = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec();
};

/**
 * @param {String} _id
 * @param {String} name
 * @param {Number} reps Integer > 0
 * @param {Number} weight Real number > 0
 * @param {String} unit "kgs" or "lbs"
 * @param {String} date "MM-DD-YY" e.g. "07-30-21"
 * @returns {Promise} Resolves to the number of documents modified.
 */
const updateExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercise.updateOne(
        { _id: _id },
        {
            name: name,
            reps: reps,
            weight: weight,
            unit: unit,
            date: date
        });
    return result;
};

/**
 * @param {String} _id 
 * @returns {Promise} Resolves to the number of deleted documents.
 */
const deleteExercise = async (_id) => {
    const result = await Exercise.deleteOne({ _id: _id });
    return result.deletedCount;
};

export { createExercise, findExercises, findExerciseById, updateExercise, deleteExercise };