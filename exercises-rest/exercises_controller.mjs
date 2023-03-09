import express from "express";
import "dotenv/config";
import * as exercises from "./exercises_model.mjs";
import { body, validationResult } from "express-validator";

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.post("/exercises", (req, res) => {
    exercises.createExercise(
        req.body.name,
        req.body.reps,
        req.body.weight,
        req.body.unit,
        req.body.date
    )
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: "Invalid request" });
        });
});

app.get("/exercises", (req, res) => {
    let filter = {};
    exercises.findExercises(filter, "", 0)
        .then(exercises => {
            res.send(exercises);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: "Invalid request" });
        });
});

app.get("/exercises/:_id", (req, res) => {
    exercises.findExerciseById(req.params._id)
        .then(exercise => {
            if (exercise !== null) {
                res.json(exercise);
            } else {
                res.status(404).json({ Error: "Not found" });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: "Invalid request" });
        });
});

app.put("/exercises/:_id", (req, res) => {
    exercises.updateExercise(
        req.params._id,
        req.body.name,
        req.body.reps,
        req.body.weight,
        req.body.unit,
        req.body.date
    )
        .then(numUpdated => {
            if (numUpdated) {
                res.json({
                    _id: req.params._id,
                    name: req.body.name,
                    reps: req.body.reps,
                    weight: req.body.weight,
                    unit: req.body.unit,
                    date: req.body.date
                });
            } else {
                res.status(404).json({ Error: "Not found" });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: "Invalid request" });
        });
});

app.delete("/exercises/:_id", (req, res) => {
    exercises.deleteExercise(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: "Not found" });
            }
        })
        .catch(error => {
            console.log(error);
            res.send({ Error: "Invalid request" });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} ...`);
});