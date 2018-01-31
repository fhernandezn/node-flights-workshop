const request = require('request');

module.exports = (dates, people, from, to) => {
    const promises = dates.map((date) => find(date.start, date.end, people, from, to));

    return Promise.all(promises).then((results) => {
        results = results.filter(r => r.price != 99999);
        results.sort((a, b) => Number(a.price) < Number(b.price) ? -1 : 1);
        return results.slice(0, 10);
    });
};

function find(start, end, people, from, to) {
    return new Promise(resolve => {
        const url = `https://almundo.com.mx/flights/async/itineraries?adults=${people}&class=M&date=${start},${end}&from=${from},${to}&to=${to},${from}`;
        const best = {
            to,
            airline: '',
            price: 99999,
            stopovers: '',
            fechas: `${start}  ${end}`,
            url
        };

        // if something happens with the request, we finish it in 30 seconds
        setTimeout(() => {
            return resolve(best);
        }, 30000);

        request(url, (error, response, body) => {
            if (error) {
                return resolve(best);
            }

            let json;
            try {
                json = JSON.parse(body);
            } catch(err) {
                return resolve(best);
            }

            if (!json.results) {
                return resolve(best);
            }

            const matrix = json.results.matrixByAirline;
          
            matrix.forEach(element => {
                  const keys = Object.keys(element.lowest_prices_by_scale);
          
                  keys.forEach(key => {
                      const stopover = element.lowest_prices_by_scale[key];

                      if (!best.price) {
                        best.airline = element.airline.name;
                        best.price = stopover.value;
                        best.stopovers = key;
                      } else if (Number(best.price) > Number(stopover.value)) {
                        best.airline = element.airline.name;
                        best.price = stopover.value;
                        best.stopovers = key;
                      }
                  });
            });

            resolve(best);
          });
    });
}