import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditExercisePage({ exerciseToEdit }) {

    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const navigate = useNavigate();

    const editExercise = async () => {
        const editExercise = { name, reps, weight, unit, date };
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: "PUT",
            body: JSON.stringify(editExercise),
            headers: {
                "Content-Type": "aplication/json",
            },
        });
        if (response.status === 200) {
            alert("Successfully edited the exercise");
        } else {
            alert(`Failed to edit exercise. Status Code: ${response.status}`);
        }
        navigate("/");
    };

    return (
        <main>
            <h2>Edit Exercise</h2>
            <input
                name="name"
                type="text"
                required
                pattern="(?!^$)([^\s])"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <span className="validity"></span>
            <input
                name="reps"
                type="number"
                required
                pattern="^0*[1-9][0-9]*"
                value={name}
                onChange={e => setReps(e.target.value)}
            />
            <span className="validity"></span>
            <input
                name="weight"
                type="number"
                required
                pattern="^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$"
                value={weight}
                onChange={e => setWeight(e.target.value)}
            />
            <span className="validity"></span>
            <select
                name="unit"
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
                required
                pattern="^(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])(-)\d{2}$"
                value={date}
                onChange={e => setDate(e.target.value)}
            />
            <span className="validity"></span>
            <button
                onClick={editExercise}>
                Save
            </button>
        </main>
    );
};