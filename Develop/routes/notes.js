const fb = require('express').Router();
const db = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
// uuidv4();  generate a new uuid

fb.get('/', (req, res) => {
    // console.info('Get Received');

    res.json(db);
});

fb.post('/', (req, res) => {
    console.info('Post Received');
    // title, text, id
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
    } 
});

module.exports = fb;