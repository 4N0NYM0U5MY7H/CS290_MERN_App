import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormInputValidation } from "react-form-input-validation";

export default function AddExerciseForm() {

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

    function formatDate(date) {
        const splitDate = date.split("-");
        return `${splitDate[1]}-${splitDate[2]}-${splitDate[0].substring(2, 4)}`
    };

    const addExercise = async () => {
        const response = await fetch("/exercises", {
            method: "POST",
            body: JSON.stringify(fields),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status === 201) { alert("Successfully added the exercise"); }
        else { alert(`Failed to add exercise. Status Code: ${response.status}`); }
        navigate("/");
    };

    const onSubmit = async (event) => {
        const isValid = await form.validate(event);
        if (isValid) {
            const newDate = formatDate(fields.date);
            fields.date = newDate;
            console.log("MAKE AN API CALL ==> useEffect", fields, errors, form);
            addExercise();
        }
    }

    useEffect(() => {
        if (form.isValidForm) {
            const newDate = formatDate(fields.date);
            fields.date = newDate;
            console.log("MAKE AN API CALL ==> useEffect", fields, errors, form);
            addExercise();
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