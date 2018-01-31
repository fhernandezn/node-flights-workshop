// add .table function to console
require('console.table');

const reader = require('./reader');
const datesGenerator = require('./dates-generator');
const finder = require('./finder');

let startTime, endTime;

function startCounter() {
    console.log('Searching...');
    startTime = new Date();
};

function endCounter() {
  endTime = new Date();
  let timeDiff = endTime - startTime; //in ms
  // strip the ms
  timeDiff /= 1000;

  // get seconds 
  const seconds = Math.round(timeDiff);
  console.log(`${seconds} seconds`);

  process.exit(0);
}

reader.ask('Start date?', 'startDate', {})
    .then((data) => {
        return reader.ask('End date?', 'endData', data);
    })
    .then((data) => {
        return reader.ask('From?', 'from', data);
    })
    .then((data) => {
        return reader.ask('To?', 'to', data);
    })
    .then((data) => {
        return reader.ask('How many people?', 'people', data);
    })
    .then((data) => {
        return reader.ask('How many days?', 'days', data);
    })
    .then((data) => {
        const dates = datesGenerator(data.startDate, data.endData, Number(data.days));
        startCounter();
        return finder(dates, data.people, data.from, data.to)
    })
    .then((best10Flights) => {
        console.table(best10Flights);
        endCounter();
    });