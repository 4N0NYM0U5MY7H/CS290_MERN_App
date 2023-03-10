import React from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";

export default function Exercise({ exercise, onDelete, onEdit }) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td><MdEdit onClick={() => onEdit(exercise)} /></td>
            <td><MdDeleteForever onDelete={() => onDelete(exercise._id)} /></td>
        </tr>
    );
};