import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddExercisePage = () => {

    const [name, setName] = useState("");
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");
    const [unit, setUnit] = useState("kgs");
    const [date, setDate] = useState("");

    const navigate = useNavigate();

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch("/exercises", {
            method: "POST",
            body: JSON.stringify(newExercise),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status === 201) { alert("Successfully added the exercise"); }
        else { alert(`Failed to add exercise. Status Code: ${response.status}`); }
        navigate("/");
    };

    return (
        <main className="App-main">
            <h2>Add Exercise</h2>
            <div className="Exercise-input">
                <label>
                    Exercise Name:
                    <input
                        name="name"
                        type="text"
                        placeholder="enter name here"
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
                        placeholder="number > 0"
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
                        placeholder="number > 0"
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
                        value={unit}
                        onChange={e => setUnit(e.target.value)}
                    >
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
                        placeholder="mm-dd-yy"
                        pattern="^(((0)\d)|((1)[0-2]))(-)([0-2]\d|(3)[0-1])(-)\d{2}$"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                </label>
                <label>
                    <button
                        onClick={addExercise}>
                        Save
                    </button>
                </label>
            </div>
        </main>
    );

};

export default AddExercisePage;