/**
 * server.js -> Entry point for the Stack Route Cricket App server
 */

/**
 * Get the modules
 */

var express =  require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    path = require('path');

/**
 * Instantiate express
 */
var app = express();

/**
 * MongoDB Connection
 */
var localURI = 'mongodb://admin:password@localhost:27017/stackroute';
var mLabURI = 'mongodb://admin:password@ds143892.mlab.com:43892/stackroute';

mongoose.connect(mLabURI, function(err) {
    if(err) {
        console.log('Error: Unable to connect to database');
        return;
    }
});

/**
 * Configure body-parser
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Allow CORS */
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

/**
 * MongoDB Models
 */
var PlayerModel = require('./dbmodels/player');

/**
 * Routes for the app
 */
var playerRouter = require('./routes/playerRouter')(PlayerModel);

/**
 * Register the routes
 */
app.use('/api', playerRouter);

/**
 * Configure express to serve static html pages inside of your public folder
 */
// app.use(express.static(path.join(__dirname, 'public')));

/**
 * Serve index.html upon loading of the webapp
 */
// app.get('/webapp', function(req, res) {
//     res.sendFile('index.html', { root: __dirname + '/public' });
// });

// app.get('/', function(req, res) {
//     res.redirect('/');
// });

/** 
 * Set up PORT 
 */
var port = process.env.PORT || 3030;

/**
 * GET request response
 */
app.get('/api', function(req, res) {
    res.json({ status: "StackRoute Cricket API is running at port: " + port});
});

/**
 * Start the server
 */
app.listen(port, function() {
    console.log('StackRoute Cricket API is running at port: ' + port);
});