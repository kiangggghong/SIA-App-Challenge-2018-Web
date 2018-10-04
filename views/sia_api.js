const https = require('https');

const API_KEY = "aghk73f4x5haxeby7z24d2rc";
const API_ROOT_URL = "https://apigw.singaporeair.com/appchallenge/api/"
const rp = require('request-promise');
const bluebird = require('bluebird');

module.exports = {
	allFlightRouteStatus: function(departureDate){
		var destinations = ["AKL", "SFO", "CPH", "CDG", "FUK", "DXB", "PEK", "DUS", "CMB", "MLE"];
		var requests = [];

		for(var index in destinations){
			requests.push(
				this.flightRouteStatus("SIN", destinations[index], departureDate)
			);
		};

		bluebird.all(requests)
		.then(function(responses){
			var validResponses = [];
			for(var index in responses){
				if (responses[index]["response"] != "Invalid Input Parameter Values"
				&& responses[index]["code"] == 200){
					validResponses.push(responses[index])
				}
			}

		})
		.catch(function(err){
			console.log("[ERROR] allFlightRouteStatus request failed");
			console.log("[ERROR] " + err);
		});
	},

	flightRouteStatus: function(originAirportCode, destinationAirportCode, scheduledDepartureDate){
		url = API_ROOT_URL + "flightroutestatus",
		request_headers = {
			"Content-Type": "application/json",
			"apikey": API_KEY
		};

		request_params = {
			"originAirportCode": originAirportCode,
			"destinationAirportCode": destinationAirportCode,
			"scheduledDepartureDate": scheduledDepartureDate
		};

		return rp({
			"uri": url,
			"method": 'POST',
			"headers": request_headers,
			"json": true,
			"body": request_params
		}).catch(function(err){
			console.log("[ERROR] flightRouteStatus request failed");
			console.log("[ERROR] " + err);
		})

	},

	flightSchedule: function(originAirportCode, destinationAirportCode, departureDate, returnFlight){
		url = API_ROOT_URL + "flightschedule";
		request_headers = {
			"Content-Type": "application/json",
			"apikey": API_KEY
		};

		request_params = {
			"originAirportCode": originAirportCode,
			"destinationAirportCode": destinationAirportCode,
			"departureDate": scheduledDepartureDate,
			"returnFlight": returnFlight
		};

		return rp({
			"uri": url,
			"method": 'POST',
			"headers": request_headers,
			"json": true,
			"body": request_params
		}).catch(function(err){
			console.log("[ERROR] flightSchedule request failed");
			console.log("[ERROR] " + err);
		})
	},

	bookingDetails: function(bookingReference, bookingLastName){
		url = API_ROOT_URL + "pax/pnr";
		request_headers = {
			"Content-Type": "application/json",
			"apikey": API_KEY
		};

		request_params = {
			"bookingReference": bookingLastName,
			"bookingLastName": bookingLastName
		};

		return rp({
			"uri": url,
			"method": 'POST',
			"headers": request_headers,
			"json": true,
			"body": request_params
		}).catch(function(err){
			console.log("[ERROR] bookingDetails request failed");
			console.log("[ERROR] " + err);
		})
	},

	flightPassengers: function(flightNo, flightDate){
		url = API_ROOT_URL + "flight/passenger";
		request_headers = {
			"Content-Type": "application/json",
			"apikey": API_KEY
		};

		request_params = {
			"flightNo": flightNo,
			"flightDate": flightDate
		};

		return rp({
			"uri": url,
			"method": 'POST',
			"headers": request_headers,
			"json": true,
			"body": request_params
		}).catch(function(err){
			console.log("[ERROR] flightPassengers request failed");
			console.log("[ERROR] " + err);
		})
	},

	checkingBaggage: function(flightNo, flightDate, bookingReference, firstName, lastName, noOfBaggage, baggageWeight){
		url = API_ROOT_URL + "checkin/baggage";
		request_headers = {
			"Content-Type": "application/json",
			"apikey": API_KEY
		};

		request_params = {
			"flightNo": flightNo,
			"flightDate": flightDate,
			"bookingReference":bookingReference,
			"firstName":firstName,
			"lastName":lastName,
			"noOfBaggage":noOfBaggage,
			"baggageWeight": baggageWeight
		};

		return rp({
			"uri": url,
			"method": 'POST',
			"headers": request_headers,
			"json": true,
			"body": request_params
		}).catch(function(err){
			console.log("[ERROR] checkingBaggage request failed");
			console.log("[ERROR] " + err);
		})
	}
}

function formatFlightListObject(destination){
	flights = destination["flights"];
	formattedFlights = [];
	for(var index in flights){
		var flight = flights[index];
		formattedFlight = {};
		formattedFlight["flightId"] = flight["legs"][0]["operatingAirlineCode"] + 
			flight["legs"][0]["flightNumber"];
		formattedFlight["timeLeft"] = "";
		formattedFlight["phase"] = "";
		formattedFlight["departure"] = destination["origin"]["cityName"] +
			destination["origin"]["airportName"];
		formattedFlight["destination"] = destination["destination"]["cityName"] +
			destination["destination"]["airportName"];

		formattedFlights.push(formattedFlight);
	}

	formattedFlight = {
		'flightId': 'SQ8173', //Flight ID
        'timeLeft': '13:45', //Time left to flight
        'phase': 'approach', //Overbooking phase
        'departure': 'Singapore Changi Airport', //Add whatever API can call 
        'destination': 'Toronto Airport',
        'overBookStatus': { //Details of overbooking seats
            'R34': { //Seat Number
                'seatStatus': 'ACCEPTED',
                'passengerId': 'P214', //Pooled passenger
                'selectedPassengerId': 'P123' //Original selected passenger
            },
            'R12': {
                'seatStatus': 'PENDING',
                'selectedPassengerId': 'P123'
            },
            'R24': {
                'seatStatus': 'REJECTED', //Seat rejected by original selected passenger
                'selectedPassengerId': 'P123'
            }
        },
    }
	
	return formattedFlight
}