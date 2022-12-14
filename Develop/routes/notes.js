const fb = require('express').Router();
const db = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

fb.get('/', (req, res) => {
    fs.readFile('./db/db.json','utf8', (err,data) => {
        res.json(JSON.parse(data));
    });
});

fb.post('/', (req, res) => {
    const {title, text} = req.body;

    if (title && text)
    {
        const note = {
            title,
            text,
            id: uuidv4()
        };

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err){
                console.error(err);
            } 
            else
            {
                const parsedNotes = JSON.parse(data);
                parsedNotes.push(note);
                fs.writeFile('./db/db.json',JSON.stringify(parsedNotes, null, 4), (writeErr) => {
                    writeErr ? console.error(writeErr) : console.info('Successfully updated Notes!');
                });
            }
        })
        res.sendStatus(200);
    } 
    else {
        res.status(500).json('Error in posting review');
    }
});

fb.delete('/:id', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err){
            console.error(err);
            res.status(500).json('Error in deleting review');
        } 
        else
        {
            const notes = JSON.parse(data);
            const filtered = notes.filter((note) => note.id != req.params.id);

            fs.writeFile('./db/db.json',JSON.stringify(filtered, null, 4), (writeErr) => {
                writeErr ? console.error(writeErr) : console.info('Successfully updated Notes!');
            });
            res.sendStatus(200);
        }
    })

})

module.exports = fb;