import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const EditExercisePage = ({ exerciseToEdit }) => {

    const history = useHistory();
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const editExercise = async () => {

    const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
        method: 'PUT',
        body: JSON.stringify({ name: name, reps: reps, weight: weight, unit: unit, date: date }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.status === 200) {
        alert("Successfully edited the exercise!");
    } else {
        alert(`Failed to edit movie, status code = ${response.status}`);
    } history.push("/");
    };

    return (
        <div>
            <h1>Edit Exercise</h1>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                placeholder="Reps"
                value={reps}
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                placeholder="Weight"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <input
                type="text"
                placeholder="Unit"
                value={unit}
                onChange={e => setUnit(e.target.value)} />
            <input
                type="text"
                placeholder="Date"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={editExercise}
            >Save</button>
        </div>
    );
}

export default EditExercisePage;