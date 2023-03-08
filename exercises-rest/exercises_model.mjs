import mongoose from "mongoose";
import "dovenv/config";

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

const exerciseShema = mongoose.Schema();

const Exercise = mongoose.model("Exercise", exerciseShema);

const createExercise = async();

const findExercises = async();

const findExerciseById = async();

const updateExercise = async();

const deleteExercise = async();

export { createExercise, findExercises, findExerciseById, updateExercise, deleteExercise };