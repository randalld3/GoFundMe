var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database/donations.sqlite');

router.get('/', function(req, res, next) {
  // Query the database for non-anonymous donations
  db.all("SELECT firstName, lastName, donationAmount FROM donations WHERE anonymous = 0", function(err, donations) {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Error fetching donations");
    }
    // Render the index page with donations data
    res.render('index', { title: 'Express', donations: donations });
  });
});

router.get('/donate', function(req, res) {
  res.render('donate', { title: 'Donate' });
});

module.exports = router;
