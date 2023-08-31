import { readingStore } from "../models/reading-store.js";

export const stationAnalytics ={

async getLatestReading(stationId) {
    const readings = await readingStore.getReadingsByStationId(stationId);
    if (readings.length > 0) {
      return readings[readings.length - 1];
    }
    else {
        return "No Readings available";
    };
  },
//For if no readings are available - latest reading is passed to this function in station-controller.js
  noReadings(reading) {
    return reading === "No Readings available";
  },
//convert degC to degF
celciusToFahrenheit(temperature) {
  let num = ((temperature * 9 / 5) + 32);
    return num.toFixed(2);
},
//converts km/h to Bft
beaufort(windspeed){
    if (windspeed >= 0.0 && windspeed < 1.0) {
        return 0;
      }
      if (windspeed >= 1.0 && windspeed < 6.0) {
        return 1;
      }
      if (windspeed >= 6.0 && windspeed < 12.0) {
        return 2;
      }
      if (windspeed >= 12.0 && windspeed < 20.0) {
        return 3;
      }
      if (windspeed >= 20.0 && windspeed < 29.0) {
        return 4;
      }
      if (windspeed >= 29.0 && windspeed < 39.0) {
        return 5;
      }
      if (windspeed >= 39.0 && windspeed < 50.0) {
        return 6;
      }
      if (windspeed >= 50.0 && windspeed < 62.0) {
        return 7;
      }
      if (windspeed >= 62.0 && windspeed < 75.0) {
        return 8;
      }
      if (windspeed >= 75.0 && windspeed < 89.0) {
        return 9;
      }
      if (windspeed >= 89.0 && windspeed < 103.0) {
        return 10;
      }
      if (windspeed >= 103.0 && windspeed <= 117) {
        return 11;
      }
      return 0;
},
//calculates windchill
windChill(temperature, windspeed) {
    let num = (13.12 + temperature * 0.6215 - 11.37 * Math.pow(windspeed, 0.16) + 0.3965 * temperature * Math.pow(windspeed, 0.16));
    return num.toFixed(2);
},
// gives text compass direction for specified wind direction range
degreesToCompass(winddirection) {
    if (winddirection >= 348.75 || winddirection < 11.25) {
        return "North";
      } else if (winddirection >= 11.25 && winddirection < 33.75) {
        return "North-North East";
      } else if (winddirection >= 33.75 && winddirection < 56.25) {
        return "North East";
      } else if (winddirection >= 56.25 && winddirection < 78.75) {
        return "East-North East";
      } else if (winddirection >= 78.75 && winddirection < 101.25) {
        return "East";
      } else if (winddirection >= 101.25 && winddirection < 123.75) {
        return "East-South East";
      } else if (winddirection >= 123.75 && winddirection < 146.25) {
        return "South East";
      } else if (winddirection >= 146.25 && winddirection < 168.75) {
        return "South-South East";
      } else if (winddirection >= 168.75 && winddirection < 191.25) {
        return "South";
      } else if (winddirection >= 191.25 && winddirection < 213.75) {
        return "South-South West";
      } else if (winddirection >= 213.75 && winddirection < 236.25) {
        return "South West";
      } else if (winddirection >= 236.25 && winddirection < 258.75) {
        return "West-South West";
      } else if (winddirection >= 258.75 && winddirection < 281.25) {
        return "West";
      } else if (winddirection >= 281.25 && winddirection < 303.75) {
        return "West-North West";
      } else if (winddirection >= 303.75 && winddirection < 326.25) {
        return "North West";
      } else if (winddirection >= 326.25 && winddirection < 348.75) {
        return "North-North West";
      } else {
        return "North";
      }
},

weatherIcon(code) {
    return weatherIcons[code];
},
//individual temp font awesome icons depending on temperature range
celciusToIcon(temperature) {
    if (temperature <= 5) {
        return "fa-solid fa-temperature-empty";
      }
      else if (temperature > 5 && temperature <= 10) {
        return "fa-solid fa-temperature-low";
      }
      else if (temperature > 10 && temperature <= 15) {
        return "fa-solid fa-temperature-quarter";
      }
      else if (temperature > 15 && temperature <= 20) {
        return "fa-solid fa-temperature-half";
      }
      else if (temperature > 20 && temperature <= 25) {
        return "fa-solid fa-temperature-three-quarters";
      }
      else if (temperature > 25 && temperature <= 27.5) {
        return "fa-solid fa-temperature-full";
      }
      else if (temperature > 27.5) {
        return "fa-solid fa-temperature-high";
      }
      return "fa-solid fa-temperature-half";
},

codeToText(code) {
    return weatherDescriptions[code] || "Unknown";
},

formatDateTime(dateTime){
return dateFormatter.format(dateTime);
},
/* simplified set of weather codes from Open weather.
Earlier version of release 4 used all 55 codes but there was a mismatch 
for earlier entries in the db - this function matches the specific weather id
retrieved from OpenWeather to one of the existing 8 codes.
..Unfortunately can no longer select "tornado" ;( */
matchWeatherCode(code) {
  if (code === 800) return 100; // Clear
  if (code >= 801 && code <= 804) return 200; // Partial clouds
  if (code >= 701 && code <= 781) return 300; // Cloudy (fog, mist, etc.)
  if (code >= 300 && code <= 321) return 400; // Light Showers (drizzle)
  if (code >= 500 && code <= 531) return 500; // Heavy Showers (rain)
  if (code >= 400 && code <= 504) return 600; // Rain
  if (code >= 600 && code <= 622) return 700; // Snow
  if (code >= 200 && code <= 232) return 800; // Thunder

  return "Unknown weather condition";
},

};

//initialisation block forOpen Weather Icons: Inserted to URL to retrieve the image
const weatherIcons = {  
    100: "01d",
    200: "02d",
    300: "03d",
    400: "10d",
    500: "09d",
    600: "09d",
    700: "13d",
    800: "11d"
};

const dateFormatter = new Intl.DateTimeFormat('nl-BE',{
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
});

const weatherDescriptions = {
  100: "Clear",
  200: "Partial Clouds",
  300: "Clouds",
  400: "Light Showers",
  500: "Heavy Showers",
  600: "Rain",
  700: "Snow",
  800: "Thunder"
};

