//Install express server
const express = require('express');
const path = require('path');
var compression = require('compression')

const app = express();

// compress all responses
app.use(compression())

app.use(function (req, res, next) {
  res.set('Cache-Control', 'public, max-age=345600'); // 4 days
  res.set("Expires", new Date(Date.now() + 2592000000 * 30).toUTCString()); // 30 months
  next();
})

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/wordle-solver-app'));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname+'/dist/wordle-solver-app/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 4202);
