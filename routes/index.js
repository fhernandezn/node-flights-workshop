const express = require('express');
const router = express.Router();
const datesGenerator = require('../core/dates-generator');
const finder = require('../core/finder');

router.get("/", (req, res) => {
  res.render('home', {title: 'Cowcations'});
});

router.post("/search", (req, res) => {
  var data = req.body;
  const dates = datesGenerator(data.startDate, data.endDate, Number(data.days));
  finder(dates, data.people, data.from.toUpperCase(), data.to.toUpperCase()).then(best10Flights => {
    res.json(best10Flights);
  })
});

module.exports = router;
