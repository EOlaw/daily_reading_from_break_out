const express = require('express');
const readingController = require('../controllers/readingController')


const router = express.Router();

router.param('id', readingController.checkID)

router.route('/').get(readingController.getAllReadings).post(readingController.checkBody, readingController.createReadings)
router.route('/:id').get(readingController.getReadings).put(readingController.updateReadings).delete(readingController.deleteReadings)

module.exports = router;