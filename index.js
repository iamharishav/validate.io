var express = require('express');
bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
var emailVerifier = require('email-verify');
app.post('/verify-email-address', function (req, res) {
	if(typeof(req.headers["x-api-key"]) != "undefined") {
		if(req.headers["x-api-key"] === "9gyKi2TwgoMF8M8l28gD94NSp10GXrfd"){ 
			if(typeof(req.body.emailAddress) != "undefined"){
			  emailVerifier.verify( req.body.emailAddress , function( err, info ){
				  if( err ){
				  	res.json({"status": "INVALID", "error_code": err.code});
				  } 
				  else{
				    if(info.success){
				    	res.json({"status": "VALID", "emailAddress": info.addr});
				    }else{
				    	res.json({"status": "INVALID", "emailAddress": info.addr});
				    }
				  }
				});
			}else{
				res.json({"message": "Please pass emailAddress in JSON body"});
			}
		}else{
			res.json({"message": "Your api key is not valid"});
		}
	}else{
		res.status(400);
		res.json({"message": "You must API key to access API."});
	}
})

app.listen(80, () => console.log('Email Validator Runs on 80'))
