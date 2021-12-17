import React, { useState } from 'react';
import { useHistory } from "react-router-dom";


export const CreateExercisePage = () => {
    const history = useHistory();

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date};
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Successfully added the movie!");
        } else {
            alert(`Failed to add movie, status code = ${response.status}`);
        }
        history.push("/");
    };

    return (
        <div>
            <h1>Add Exercise</h1>
            <input
                type="text"
                placeholder="The name of the exercise"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                placeholder="The number of times the exercise was performed"
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                placeholder="The weight of the weights used for the exercise"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <input
                type="text"
                placeholder="The unit of measurement of the weight"
                value={unit}
                onChange={e => setUnit(e.target.value)} />
            <input
                type="text"
                placeholder="The date the exercise was performed"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={addExercise}
            >Add</button>
        </div>
    );
}

export default CreateExercisePage;