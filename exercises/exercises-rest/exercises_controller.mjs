import express from "express";
import "dotenv/config";
import * as exercises from "./exercises_model.mjs";
import { body, validationResult } from "express-validator";

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.post("/exercises",
    body("name").notEmpty(),

    /** Must be an integer. Leading 0s ok. */
    body("reps").matches(/^0*[1-9]\d*/),

    /** Must be number. Leading 0s ok. Can be decimal. */
    body("weight").matches(/^(0*[1-9]\d*(\.\d+)?|0+\.\d*[1-9]\d*)$/),

    /** Must be "kgs" or "lbs". */
    body("unit").matches(/([k][g][s]|[l][b][s])/),

    /** Must match MM-DD-YY. */
    body("date").matches(/^(((0)\d)|((1)[0-2]))(-)([0-2]\d|(3)[0-1])(-)\d{2}$/),

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error(errors.array());
            return res.status(400).json({ Error: "Invalid request" });
        }

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
            exercise !== null
                ? res.json(exercise)
                : res.status(404).json({ Error: "Not found" });
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: "Invalid request" });
        });
});

app.put("/exercises/:_id",
    body("name").notEmpty(),

    /** Must be an integer. Leading 0s ok. */
    body("reps").matches(/^0*[1-9][0-9]*/),

    /** Must be number. Leading 0s ok. Can be decimal. */
    body("weight").matches(/^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/),

    /** Must be "kgs" or "lbs". */
    body("unit").matches(/([k][g][s]|[l][b][s])/),

    /** Must match MM-DD-YY. */
    body("date").matches(/^\d\d-\d\d-\d\d$/),

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error(errors.array());
            return res.status(400).json({ Error: "Invalid request" });
        }

        exercises.updateExercise(
            req.params._id,
            req.body.name,
            req.body.reps,
            req.body.weight,
            req.body.unit,
            req.body.date
        )
            .then(number_updated => {
                number_updated.matchedCount
                    ? number_updated.modifiedCount
                        ? res.json({
                            _id: req.params._id,
                            name: req.body.name,
                            reps: req.body.reps,
                            weight: req.body.weight,
                            unit: req.body.unit,
                            date: req.body.date
                        })
                        : res.status(400).json({ Error: "Invalid Request" })
                    : res.status(404).json({ Error: "Not found" });
            })
            .catch(error => {
                console.log(error);
                res.status(400).json({ Error: "Invalid request" });
            });
    });

app.delete("/exercises/:_id", (req, res) => {
    exercises.deleteExercise(req.params._id)
        .then(deleted_count => {
            deleted_count === 1
                ? res.status(204).send()
                : res.status(404).json({ Error: "Not found" });
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: "Invalid request" });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} ...`);
});