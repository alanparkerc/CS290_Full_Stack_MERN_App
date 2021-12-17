import React from 'react';
import { Link } from 'react-router-dom';
import ExerList from '../components/ExerList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({ setExerciseToEdit }) {
    const history = useHistory();
    const [exercises, setExercises] = useState([]);

    const onEdit = async exerciseToEdit => {
        setExerciseToEdit(exerciseToEdit);
        history.push("/edit-exercise");
    }

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const response = await fetch('/exercises');
            const exercises = await response.json();
            setExercises(exercises);
        } else {
            console.error(`Failed to delete movie with id = ${_id}, status code = ${response.status}`)
        }
    }

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const exercises = await response.json();
        setExercises(exercises);
    }

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>
            <h2>List of Exercises</h2>
            <ExerList exercises={exercises}
                onDelete={onDelete}
                onEdit={onEdit}>
            </ExerList>
            <Link to="/create-exercise">Create an Exercise</Link>
        </>
    );
}




export default HomePage;