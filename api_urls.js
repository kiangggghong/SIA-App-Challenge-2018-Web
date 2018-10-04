const express = require('express');
const router = express.Router();

const adminApiViews = require('./views/admin_api_views')

router.get('/flightList', function(req, res, next) {
	adminApiViews.getFlightList()
});

router.post('/flightDetails', function(req, res, next) {
	console.log("hi api");
});

router.post('/passengerList', function(req, res, next) {
	console.log("hi api");
});

router.post('/passengerDetails', function(req, res, next) {
	console.log("hi api");
});

module.exports = router;