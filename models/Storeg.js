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












feedbackButton.addEventListener('click', function() {
    var articleFieldValue = articleField.value;
    var titleFieldValue = title.value;
  
    if (articleFieldValue.length == 0 || titleFieldValue.length == 0) {
      window.alert('Please fill the field');
    } else {
      addNews();
  
      function addNews() {
        class News {
          constructor(title, text, image) {
            this.title = title;
            this.text = text;
            this.image = image;
          }
        }
  
        var DEFAULT_PHOTO = "../images/Random-turtle.jpg";
        var feedback = new News(title.value, articleField.value, DEFAULT_PHOTO);
        navigator.onLine
          ? sendToServer(feedback)
          : addToStorage(feedback);
        alert('Article sent!');
  
      }
  
      function sendToServer(feedbackItem) {
        var data = {
              title: title.value,
              shortdescription: title.value,
              longdescription: articleField.value
          }
          articleField.value = ''
          title.value = ''
          $.ajax({
              url: 'http://localhost:8080/api/feedback',
              type: "post",
              dataType: "json",
              data: data
          });
  
      }
  
      function addToStorage(feedbackItem) {
        feedback = []
        feedback.push(feedbackItem);
        if (useLocalStorage) {
          localStorage.setItem('feedback', JSON.stringify(feedback));
        } else {
          const dbName = "Storage";
          var open = indexedDB.open(dbName);
          open.onupgradeneeded = function() {
            var db = open.result;
            var store = db.createObjectStore("News", {keyPath: "title"});
          };
          open.onsuccess = function() {
            var db = open.result;
            var tx = db.transaction("News", "readwrite");
            var store = tx.objectStore("News");
            store.put(feedbackItem)
        }
        }
      }
    }
  });