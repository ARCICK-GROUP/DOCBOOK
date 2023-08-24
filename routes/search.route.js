const { Router } = require('express');


doctorSearchEngine = Router();

doctorSearchEngine.get('/', (req, res) => {
    res.status(200).json([{message: 'cracked the protection!'}])
})

module.exports = doctorSearchEngine;