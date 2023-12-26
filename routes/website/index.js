const express = require('express');
const router = express.Router();

// Import individual route files

const BookAnAppointment = require('./bookAnAppointment');
router.use('/book-an-appointment', BookAnAppointment);


module.exports = router;