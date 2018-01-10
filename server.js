var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');
var cors = require('cors')

// configure app
app.use(cors());
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port
app.listen(8080, function () {

});
// DATABASE SETUP
var mongoose = require('mongoose');
mongoose.connect('mongodb://frek2816:microsoft2012@ds239117.mlab.com:39117/frek2816'); // connect to our database

// Handle the connection event
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log("DB connection alive");
});

// News models lives here
var News = require('./models/news');


// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// on routes that end in /news
// —------------------------------------------------—
router.route('/news')

// create a news (accessed at POST http://localhost:8080/news)
    .post(function(req, res) {

        var news = new News(); // create a new instance of the News model
        news.title = req.body.title;
        news.longdescription = req.body.longdescription; // set the news name (comes from the request)
        news.shortdescription = req.body.shortdescription;
        news.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Review created!' });
        });


    })  
    

    // get all the news (accessed at GET http://localhost:8080/api/news)
    .get(function(req, res) {
        News.find(function(err, news) {
            if (err)
                res.send(err);

            res.json(news);
        });
    });

// on routes that end in /news/:news_id
// —------------------------------------------------—
router.route('/news/:news_id')

// get the news with that id
    .get(function(req, res) {
        News.findById(req.params.news_id, function(err, news) {
            if (err)
                res.send(err);
            res.json(news);
        });
    })

    // update the news with this id
    .put(function(req, res) {
        News.findById(req.params.news_id, function(err, news) {

            if (err)
                res.send(err);

            news.title = req.body.title;
            news.longdescription = req.body.longdescription;
            news.shortdescription = req.body.shortdescription
            news.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'News updated!' });
            });

        });
    })

    // delete the news with this id
    .delete(function(req, res) {
        News.remove({
            _id: req.params.news_id
        }, function(err, news) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

    


// REGISTER OUR ROUTES —---------------------------—
app.use('/api', router);

var Feedback = require('./models/feedback');


// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// on routes that end in /feedback
// —------------------------------------------------—
router.route('/feedback')

// create a feedback (accessed at POST http://localhost:8080/feedback)
    .post(function(req, res) {

        var feedback = new Feedback(); // create a new instance of the Feedback model
        feedback.title = req.body.title;
        feedback.longdescription = req.body.longdescription; // set the feedback name (comes from the request)
        feedback.shortdescription = req.body.shortdescription;
        feedback.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Review created!' });
        });


    })  
    

    // get all the feedback (accessed at GET http://localhost:8080/api/feedback)
    .get(function(req, res) {
        Feedback.find(function(err, feedback) {
            if (err)
                res.send(err);

            res.json(feedback);
        });
    });

// on routes that end in /feedback/:feedback_id
// —------------------------------------------------—
router.route('/feedback/:feedback_id')

// get the feedback with that id
    .get(function(req, res) {
        Feedback.findById(req.params.feedback_id, function(err, feedback) {
            if (err)
                res.send(err);
            res.json(feedback);
        });
    })

    // update the feedback with this id
    .put(function(req, res) {
        Feedback.findById(req.params.feedback_id, function(err, feedback) {

            if (err)
                res.send(err);

            feedback.title = req.body.title;
            feedback.longdescription = req.body.longdescription;
            feedback.shortdescription = req.body.shortdescription
            feedback.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Feedback updated!' });
            });

        });
    })

    // delete the feedback with this id
    .delete(function(req, res) {
        Feedback.remove({
            _id: req.params.feedback_id
        }, function(err, feedback) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

    


// REGISTER OUR ROUTES —---------------------------—
app.use('/api', router);
