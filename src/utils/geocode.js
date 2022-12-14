const request = require("request");

const geocode = (adress, callback) => {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
    adress
  )}&limit=1&appid=199b8f32b1907908c96a98b673af4540`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect", undefined);
    } else if (body.length === 0) {
      callback("search invalid", undefined);
    } else {
      callback(undefined, {
        latitude: Math.floor(body[0].lat),
        longtitude: Math.floor(body[0].lon),
        location: `${body[0].name}, ${body[0].state}, ${body[0].country}`,
      });
    }
  });
};

module.exports = geocode;
