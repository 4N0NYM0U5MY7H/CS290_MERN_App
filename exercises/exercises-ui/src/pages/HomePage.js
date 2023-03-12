import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExerciseList from "../components/ExerciseList";

function HomePage({ setExerciseToEdit }) {
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`,
            {
                method: "DELETE"
            });
        response.status === 204
            ? setExercises(exercises.filter(e => e._id !== _id))
            : console.error(`Failed to delete exercise _id: ${_id}. Status Code: ${response.status}`);
    };

    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        navigate("/edit-exercise");
    };

    const loadExercises = async () => {
        const response = await fetch("/exercises");
        const exercises = await response.json();
        setExercises(exercises);
    };

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <main className="App-main">
            <h2>Home Page</h2>
            <ExerciseList
                exercises={exercises}
                onDelete={onDelete}
                onEdit={onEdit}
            />
        </main>
    );
};

export default HomePage;