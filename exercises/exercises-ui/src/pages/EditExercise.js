import React from "react";
import EditExerciseForm from "../components/EditExerciseForm";

function EditExercisePage({ exerciseToEdit }) {
    return (
        <main className="App-main">
            <h2>Edit Exercise</h2>
            <EditExerciseForm exerciseToEdit={exerciseToEdit} />
        </main>
    );
};

export default EditExercisePage;