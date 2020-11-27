var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
var cors = require('cors')

/* Setup empty JS object to act as endpoint for all routes */
projectData={};

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

/* Initialize all route with a callback function */
app.get('/all', getData);

/* Callback function to complete GET '/all' */
function getData(req,res){
    res.send(projectData)
};

/* POST route */
app.post('/addEntry', addEntry);

function addEntry(request, response) {
    projectData = {
    date: request.body.date,
    location: request.body.location,
    country: request.body.country,
    temp: request.body.temp,
    };
    response.send({ message: "Post received" });
};
