'use strict';

const {WebhookClient} = require('dialogflow-fulfillment');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

function getInfo(req,res){
	res.json({
			fulfillmentText:"",
			fulfillmentMessages:[{
					text : [
						text: 'Your competitors are making a progress. '
			]}]
	});
}

// Webhook
app.post('/', function (req, res) {
    if(req.body.queryResult.intent.displayName){
		getInfo(req,res);
	}
});

app.listen(process.env.PORT || 8082, function () {
    console.info(`Webhook listening`)
});