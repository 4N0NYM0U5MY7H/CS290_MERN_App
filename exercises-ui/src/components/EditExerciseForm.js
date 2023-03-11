import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormInputValidation } from "react-form-input-validation";

function EditExerciseForm({ exerciseToEdit }) {

    /**
     * Sets the Required date string (MM-DD-YY) to ISO8601 format (YYYY-MM-DD).
     * @param {String} date (MM-DD-YY)
     * @returns {String} IS08601 formatted date string.
     */
    function setDate(date) {
        const split_date = date.split("-");
        return `20${split_date[2]}-${split_date[0]}-${split_date[1]}`
    };

    const [fields, errors, form] = useFormInputValidation(
        {
            name: exerciseToEdit.name,
            reps: exerciseToEdit.reps,
            weight: exerciseToEdit.weight,
            unit: exerciseToEdit.unit,
            date: setDate(exerciseToEdit.date)
        },
        {
            name: "required",
            reps: "required|numeric|digits_between:1,999999",
            weight: "required|numeric|digits_between:1,999999",
            unit: "required",
            date: "required|date"
        }
    );

    const navigate = useNavigate();

    /**
     * Formats the date string to the following format: MM-DD-YY.
     * @param {String} date ISO8601 date string.
     * @returns {String} MM-DD-YY date string.
     */
    function formatDate(date) {
        const split_date = date.split("-");
        return `${split_date[1]}-${split_date[2]}-${split_date[0].substring(2, 4)}`
    };

    const editExercise = async () => {
        const response = await fetch(`/exercises/${exerciseToEdit._id}`,
            {
                method: "PUT",
                body: JSON.stringify(fields),
                headers:
                {
                    "Content-Type": "application/json",
                },
            });
        response.status === 200
            ? alert("Successfully edited the exercise")
            : alert(`Failed to edit exercise. Status Code: ${response.status}`);
        navigate("/");
    };

    const onSubmit = async (event) => {
        const is_valid = await form.validate(event);
        if (is_valid) {
            const new_date = formatDate(fields.date);
            fields.date = new_date;
            console.log("MAKE AN API CALL", fields, errors, form);
            editExercise();
        }
    }

    useEffect(() => {
        if (form.isValidForm) {
            const new_date = formatDate(fields.date);
            fields.date = new_date;
            console.log("MAKE AN API CALL ==> useEffect", fields, errors, form);
            editExercise();
        }
    }, []);

    return (
        <form
            className="Exercise-input"
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}
        >
            <p>
                <label>
                    Exercise Name:
                    <input
                        type="text"
                        name="name"
                        onBlur={form.handleBlurEvent}
                        onChange={form.handleChangeEvent}
                        value={fields.name}
                        data-attribute-name="Exercise Name"
                        data-async
                    />
                </label>
                <label className="error">
                    {errors.name ? errors.name : ""}
                </label>
            </p>
            <p>
                <label>
                    Reps:
                    <input
                        type="number"
                        name="reps"
                        onBlur={form.handleBlurEvent}
                        onChange={form.handleChangeEvent}
                        value={fields.reps}
                    />
                </label>
                <label className="error">
                    {errors.reps ? errors.reps : ""}
                </label>
            </p>
            <p>
                <label>
                    Weight:
                    <input
                        type="number"
                        name="weight"
                        onBlur={form.handleBlurEvent}
                        onChange={form.handleChangeEvent}
                        value={fields.weight}
                    />
                </label>
                <label className="errors">
                    {errors.weight ? errors.weight : ""}
                </label>
            </p>
            <p>
                <label>
                    Units:
                    <select
                        id="unit"
                        name="unit"
                        onBlur={form.handleBlurEvent}
                        onChange={form.handleChangeEvent}
                        value={fields.unit}
                    >
                        <option value="kgs">kgs</option>
                        <option value="lbs">lbs</option>
                    </select>
                </label>
                <label className="error">
                    {errors.unit ? errors.unit : ""}
                </label>
            </p>
            <label>
                Date:
                <input
                    type="date"
                    name="date"
                    onChange={form.handleChangeEvent}
                    value={fields.date}
                />
            </label>
            <label className="error">
                {errors.date ? errors.date : ""}
            </label>
            <p>
                <button type="submit">Submit</button>
            </p>
        </form>
    );
};

export default EditExerciseForm;