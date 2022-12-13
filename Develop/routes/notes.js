const fb = require('express').Router();

fb.get('/', (req, res) => {
    console.info('Get Received');
});

fb.post('/', (req, res) => {
    console.info('Post Received');
});

module.exports = fb;