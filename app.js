const host = '127.0.0.1';
const port = 3000;

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const session = require('client-sessions');
// const firebase = require('firebase');

const db_connection = require('./firebase_connection')
const app = express();

// app.use(session({
// 	cookieName: 'session',
// 	secret: '/m/`/ |-|34r|27t /w/!g|_|_ 90 0|nn|',
// 	duration: 30 * 60 * 1000,
// 	activeDuration: 5 * 60 * 1000,
// 	httpOnly: true,
// 	secure: true,
// 	ephemeral: true
// }));

//view engine
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'templates'));

// Static
app.use(express.static('./static'));

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/api', require('./api_urls'));
app.use('/', require('./urls'));

app.listen(port, function(){
	console.log("Listening to port: "+port);
	console.log("Running on host: "+host);
});
