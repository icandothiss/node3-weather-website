const request = require("request");

const forecast = (lat, lon, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${encodeURIComponent(
    lat
  )}&lon=${encodeURIComponent(
    lon
  )}&appid=199b8f32b1907908c96a98b673af4540&units=imperial`;
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const {
        main: { temp, feels_like: tempFeel },
        weather: [{ description }],
      } = body;
      callback(
        undefined,
        `${description}. It is currently ${temp} degrees out. it feels like ${tempFeel} degrees out`
      );
    }
  });
};

module.exports = forecast;
