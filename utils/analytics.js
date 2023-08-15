import { stationStore } from "../models/station-store.js"
import { readingStore } from "../models/reading-store.js";
import { request } from "express";

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

  noReadings(reading) {
    return reading === "No Readings available";
  },

celciusToFahrenheit(temperature) {
  let num = ((temperature * 9 / 5) + 32);
    return num.toFixed(2);
},

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

windChill(temperature, windspeed) {
    let num = (13.12 + temperature * 0.6215 - 11.37 * Math.pow(windspeed, 0.16) + 0.3965 * temperature * Math.pow(windspeed, 0.16));
    return num.toFixed(2);
},

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

openWeatherIcon(code){
  return openWeatherIcons[code];
},

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

getIdFromList(list){
    let id= list[0];
    for(let i = 0; i < list.length; i++) {
        id = list[i]._id
    };
    return id;
},

formatDateTime(dateTime){
return dateFormatter.format(dateTime);
},

};

const weatherIcons = {  
    0: "fa-solid fa-sun",
    100: "fa-solid fa-sun",
    200: "fa-solid fa-cloud-sun",
    300: "fa-solid fa-cloud",
    400: "fa-solid fa-cloud-rain",
    500: "fa-solid fa-cloud-showers-heavy",
    600: "fa-solid fa-umbrella",
    700: "fa-solid fa-snowflake",
    800: "fa-solid fa-cloud-bolt"
};

const openWeatherIcons = {
  200: "11d",
  201: "11d",
  202: "11d",
  210: "11d",
  211: "11d",
  212: "11d",
  221: "11d",
  230: "11d",
  231: "11d",
  232: "11d",
  300: "09d",
  301: "09d",
  302: "09d",
  310: "09d",
  311: "09d",
  312: "09d",
  313: "09d",
  314: "09d",
  321: "09d",
  500: "10d",
  501: "10d",
  502: "10d",
  503: "10d",
  504: "10d",
  511: "13d",
  520: "09d",
  521: "09d",
  522: "09d",
  531: "09d",
  600: "13d",
  601: "13d",
  602: "13d",
  611: "13d",
  612: "13d",
  613: "13d",
  615: "13d",
  616: "13d",
  620: "13d",
  621: "13d",
  622: "13d",
  701: "50d",
  711: "50d",
  721: "50d",
  731: "50d",
  741: "50d",
  751: "50d",
  761: "50d",
  762: "50d",
  771: "50d",
  781: "50d",
  800: "01d",
  801: "02d",
  802: "03d",
  803: "04d",
  804: "04d",
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
  200: "Thunderstorm with light rain",
  201: "Thunderstorm with rain",
  202: "Thunderstorm with heavy rain",
  210: "Light thunderstorm",
  211: "Thunderstorm",
  212: "Heavy thunderstorm",
  221: "Ragged thunderstorm",
  230: "Thunderstorm with light drizzle",
  231: "Thunderstorm with drizzle",
  232: "Thunderstorm with heavy drizzle",
  300: "Light intensity drizzle",
  301: "Drizzle",
  302: "Heavy intensity drizzle",
  310: "Light intensity drizzle rain",
  311: "Drizzle rain",
  312: "Heavy intensity drizzle rain",
  313: "Shower rain and drizzle",
  314: "Heavy shower rain and drizzle",
  321: "Shower drizzle",
  500: "Light rain",
  501: "Moderate rain",
  502: "Heavy intensity rain",
  503: "Very heavy rain",
  504: "Extreme rain",
  511: "Freezing rain",
  520: "Light intensity shower rain",
  521: "Shower rain",
  522: "Heavy intensity shower rain",
  531: "Ragged shower rain",
  600: "Light snow",
  601: "Snow",
  602: "Heavy snow",
  611: "Sleet",
  612: "Light shower sleet",
  613: "Shower sleet",
  615: "Light rain and snow",
  616: "Rain and snow",
  620: "Light shower snow",
  621: "Shower snow",
  622: "Heavy shower snow",
  701: "Mist",
  711: "Smoke",
  721: "Haze",
  731: "Sand/dust whirls",
  741: "Fog",
  751: "Sand",
  761: "Dust",
  762: "Volcanic ash",
  771: "Squalls",
  781: "Tornado",
  800: "Clear sky",
  801: "Few clouds: 11-25%",
  802: "Scattered clouds: 25-50%",
  803: "Broken clouds: 51-84%",
  804: "Overcast clouds: 85-100%",
};