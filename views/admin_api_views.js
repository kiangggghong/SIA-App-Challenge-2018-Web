const dbUtil = require('../firebase_connection');
const sia_api = require('./sia_api');

module.exports = {
	getFlightList: function(){
		// currentDate = getTodayFormattedDate();
		currentDate = "2018-08-06";
		sia_api.allFlightRouteStatus(currentDate);
	},

	getFlightDetails: function(){

	},

	getPassengerList: function(){

	},

	getPassengerDetails: function(){

	}
}

function getTodayFormattedDate(){
	var today = new Date();
	var date = today.getDate();
	var month = today.getMonth()+1;
	var year =  today.getFullYear();

	if (month < 10){
		month = "0" + month;
	}

	var currentDate = date + "-" + month + "-" + year;
	return currentDate
}