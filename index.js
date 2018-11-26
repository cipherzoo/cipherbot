'use strict';

const {WebhookClient} = require('dialogflow-fulfillment');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

function fallback (agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
}

function getUpdates(agent){
	return "Your competitor is making a progress. Wanna take a lookup ?"
}

function WebhookProcessing(req, res) {
    const agent = new WebhookClient({request: req, response: res});
    console.info(`agent set`);

    let intentMap = new Map();
    //intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
	intentMap.set('get-updates', getUpdates);
    agent.handleRequest(intentMap);
}

// Webhook
app.post('/', function (req, res) {
    WebhookProcessing(req, res);
});

app.listen(process.env.PORT || 8082, function () {
    console.info(`Webhook listening`)
});