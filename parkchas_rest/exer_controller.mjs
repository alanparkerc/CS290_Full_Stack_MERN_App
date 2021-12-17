import express from 'express';
import * as exers from './exer_model.mjs';
const app = express();

const PORT = 3000

app.use(express.json());

app.post('/exercises', (req, res) => {
    exers.createExer(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exer => {
            res.status(201).json(exer);
        })
        .catch(error => {
            console.error(error);
            // In case of an error, send back status code 400 in case of an error.
            // A better approach will be to examine the error and send an
            // error status code corresponding to the error.
            res.status(400).json({ Error: 'Request failed' });
        });
});

app.get("/exercises", (req, res) => {

    exers.findExers().then(exers => {
            console.log(exers)
            res.send(exers);
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });

});


app.put('/exercises/:_id', (req, res) => {
    exers.editExer(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight,unit: req.body.unit, date: req.body.date })
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});

app.delete('/exercises/:id', (req, res) => {
    exers.deleteById(req.params.id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});