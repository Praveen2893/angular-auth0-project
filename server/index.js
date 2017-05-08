var express = require('express');
var app = express();
var jwt = require('express-jwt');
var cors = require('cors');

app.use(cors());

var authCheck = jwt({
	secret : '4VewcpE2gZCAgunOJteK4K45oxCZ0jkU-o5K2cFMO2S0r-hfv6szDeJb40ASj_uw',
	audience : '2zc3ZpoAbthEijJXYvY0b1IW6l8Y2vlA'
});


app.get('/api/public',function(req,res){
	res.json({
		message : "Hello you are from public, Don't need to be authenticated"
	});
});


app.get('/api/private',authCheck, function(req,res){
	res.json({
		message : "Hello you are from private, You need to be authenticated"
	});
});

app.listen(4000);

console.log("Listening http://localhost:4000");