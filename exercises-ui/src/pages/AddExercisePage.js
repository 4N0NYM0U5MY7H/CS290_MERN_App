import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddExercisePage = () => {

    const [name, setName] = useState("");
    const [reps, setReps] = useState(0);
    const [weight, setWeight] = useState("");
    const [unit, setUnit] = useState("");
    const [date, setDate] = useState("");

    const navigate = useNavigate();

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch("/exercises", {
            method: "POST",
            body: JSON.stringify(newExercise),
            headers: {
                "Content-Type": "aplication/json",
            },
        });
        if (response.status === 200) {
            alert("Successfully added the exercise");
        } else {
            alert(`Failed to add exercise. Status Code: ${response.status}`);
        }
        navigate("/");
    };

    return (
        <main>
            <h2>Add Exercise</h2>
            <input
                name="name"
                type="text"
                placeholder="Enter exercise name"
                required
                pattern="(?!^$)([^\s])"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <span className="validity"></span>
            <input
                name="reps"
                type="number"
                placeholder="Enter number of reps"
                required
                pattern="^0*[1-9][0-9]*"
                value={reps}
                onChange={e => setReps(e.target.value)}
            />
            <span className="validity"></span>
            <input
                name="weight"
                type="number"
                placeholder="Enter weight used"
                required
                pattern="^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$"
                value={weight}
                onChange={e => setWeight(e.target.value)}
            />
            <span className="validity"></span>
            <select
                name="unit"
                placeholder="Select units"
                required
                value={unit}
                onChange={e => setUnit(e.target.value)}
            >
                <option value="kgs">kgs</option>
                <option value="lbs">lbs</option>
            </select>
            <input
                name="date"
                type="text"
                placeholder="Enter date"
                required
                pattern="^(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])(-)\d{2}$"
                value={date}
                onChange={e => setDate(e.target.value)}
            />
            <span className="validity"></span>
            <button
                onClick={addExercise}>
                Add
            </button>
        </main>
    );

};

export default AddExercisePage;