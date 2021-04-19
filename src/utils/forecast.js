const request = require('request');

const weatherStackToken = '60266219577ed2341baa752243552833';

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=' + weatherStackToken + '&query=' + lat + ',' + long + '&units=m';
    request({ url, json: true }, (error, {body}) => {
        if (!error) {
            if (!body.error) {
                callback(undefined, body.current);
            } else {
                callback('Error - Unable to find location', undefined);
            }
        } else {
            callback('Unable to connect to weather service!', undefined);
        }
    });
}

module.exports = forecast;