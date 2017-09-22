var express = require('express');
var axios = require('axios');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello Vistar! Hope your day is going swell :)')
})

app.post('/', (req, res) => {

  if (req.body.latitude && req.body.longitude) {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.body.latitude},${req.body.longitude}&key=${process.env.GOOGLE_API_KEY}`)
    .then((resp) => {
      res.send(["" + resp.data.results[1]['address_components'][2]['long_name']]);
    })
    .catch((err) => {
      console.log('Error finding state: ', err);
      res.sendStatus(500);
    })
  } else {
    res.send('Please provide coordinates')
  }
})

var port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('Server started! Running on', port);
})
