import React from 'react';
import Exercise from './Exercise';

function ExerList({ exercises, onDelete, onEdit }) {
    return (
        <table id="exercises">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, i) => <Exercise exercise={exercise}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    key={i} />)}
            </tbody>
        </table>
    );
}

export default ExerList;
