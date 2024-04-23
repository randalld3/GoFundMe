var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database/donations.sqlite');

router.post('/submit-donation', (req, res) => {
  const { firstName, lastName, donationAmount, anonymousDonation } = req.body;
  
  // Data validation
  if (!firstName || !lastName || isNaN(donationAmount) || donationAmount <= 0) {
    return res.status(400).send("Invalid input data");
  }

  const anonymous = anonymousDonation ? 1 : 0;

  const stmt = db.prepare('INSERT INTO donations (firstName, lastName, donationAmount, anonymous) VALUES (?, ?, ?, ?)');
  stmt.run([firstName, lastName, donationAmount, anonymous], function(err) {
    if (err) {
      res.status(500).json({ message: "Error processing your donation", error: err.message });
      console.error(err.message);
    } else {
      // Redirect user to index page
      res.redirect('/');
    }
  });
  stmt.finalize();
});

module.exports = router;
