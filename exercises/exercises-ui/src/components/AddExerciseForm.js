import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormInputValidation } from "react-form-input-validation";

function AddExerciseForm() {

    const [fields, errors, form] = useFormInputValidation(
        {
            name: "",
            reps: "",
            weight: "",
            unit: "",
            date: ""
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
     * Formats the date string as follows: MM-DD-YY.
     * @param {String} date ISO8601 date string.
     * @returns {String} MM-DD-YY date string.
     */
    function formatDate(date) {
        const split_date = date.split("-");
        return `${split_date[1]}-${split_date[2]}-${split_date[0].substring(2, 4)}`
    };

    const addExercise = async () => {
        const response = await fetch("/exercises",
            {
                method: "POST",
                body: JSON.stringify(fields),
                headers:
                {
                    "Content-Type": "application/json",
                },
            });
        response.status === 201
            ? alert("Successfully added the exercise")
            : alert(`Failed to add exercise. Status Code: ${response.status}`);
        navigate("/");
    };

    const onSubmit = async (event) => {
        const is_valid = await form.validate(event);
        if (is_valid) {
            const new_date = formatDate(fields.date);
            fields.date = new_date;
            console.log("MAKE AN API CALL", fields, errors, form);
            addExercise();
        }
    }

    useEffect(() => {
        if (form.isValidForm) {
            const new_date = formatDate(fields.date);
            fields.date = new_date;
            console.log("MAKE AN API CALL ==> useEffect", fields, errors, form);
            addExercise();
        }
    }, []);

    return (
        <form
            className="Exercise-form"
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
                        placeholder="enter name here"
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
                        placeholder="number > 0"
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
                        placeholder="number > 0"
                    />
                </label>
                <label className="error">
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
                        <option value="">Select units</option>
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

export default AddExerciseForm;