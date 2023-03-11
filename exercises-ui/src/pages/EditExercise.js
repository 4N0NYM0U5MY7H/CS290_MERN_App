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
                "Content-Type": "application/json",
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
        <main className="App-main">
            <h2>Edit Exercise</h2>
            <div className="Exercise-input">
                <label>
                    Exercise Name:
                    <input
                        name="name"
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </label>
                <label>
                    Reps:
                    <input
                        name="reps"
                        type="number"
                        required
                        pattern="^0*[1-9]\d*"
                        value={reps}
                        onChange={e => setReps(e.target.value)}
                    />
                </label>
                <label>
                    Weight:
                    <input
                        name="weight"
                        type="number"
                        required
                        pattern="^(0*[1-9]\d*(\.\d+)?|0+\.\d*[1-9]\d*)$"
                        value={weight}
                        onChange={e => setWeight(e.target.value)}
                    />
                </label>
                <label>
                    Units:
                    <select
                        name="unit"
                        required
                        value={unit}
                        onChange={e => setUnit(e.target.value)}>
                        <option value="kgs">kgs</option>
                        <option value="lbs">lbs</option>
                    </select>
                </label>
                <label>
                    Date:
                    <input
                        name="date"
                        type="text"
                        required
                        pattern="^(((0)\d)|((1)[0-2]))(-)([0-2]\d|(3)[0-1])(-)\d{2}$"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                </label>
                <label>
                    <button
                        onClick={editExercise}>
                        Save
                    </button>
                </label>
            </div>
        </main>
    );
};