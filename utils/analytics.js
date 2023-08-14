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
  200: "https://openweathermap.org/img/wn/11d.png",
  201: "https://openweathermap.org/img/wn/11d.png",
  202: "https://openweathermap.org/img/wn/11d.png",
  210: "https://openweathermap.org/img/wn/11d.png",
  211: "https://openweathermap.org/img/wn/11d.png",
  212: "https://openweathermap.org/img/wn/11d.png",
  221: "https://openweathermap.org/img/wn/11d.png",
  230: "https://openweathermap.org/img/wn/11d.png",
  231: "https://openweathermap.org/img/wn/11d.png",
  232: "https://openweathermap.org/img/wn/11d.png",
  300: "https://openweathermap.org/img/wn/09d.png",
  301: "https://openweathermap.org/img/wn/09d.png",
  302: "https://openweathermap.org/img/wn/09d.png",
  310: "https://openweathermap.org/img/wn/09d.png",
  311: "https://openweathermap.org/img/wn/09d.png",
  312: "https://openweathermap.org/img/wn/09d.png",
  313: "https://openweathermap.org/img/wn/09d.png",
  314: "https://openweathermap.org/img/wn/09d.png",
  321: "https://openweathermap.org/img/wn/09d.png",
  500: "https://openweathermap.org/img/wn/10d.png",
  501: "https://openweathermap.org/img/wn/10d.png",
  502: "https://openweathermap.org/img/wn/10d.png",
  503: "https://openweathermap.org/img/wn/10d.png",
  504: "https://openweathermap.org/img/wn/10d.png",
  511: "https://openweathermap.org/img/wn/13d.png",
  520: "https://openweathermap.org/img/wn/09d.png",
  521: "https://openweathermap.org/img/wn/09d.png",
  522: "https://openweathermap.org/img/wn/09d.png",
  531: "https://openweathermap.org/img/wn/09d.png",
  600: "https://openweathermap.org/img/wn/13d.png",
  601: "https://openweathermap.org/img/wn/13d.png",
  602: "https://openweathermap.org/img/wn/13d.png",
  611: "https://openweathermap.org/img/wn/13d.png",
  612: "https://openweathermap.org/img/wn/13d.png",
  613: "https://openweathermap.org/img/wn/13d.png",
  615: "https://openweathermap.org/img/wn/13d.png",
  616: "https://openweathermap.org/img/wn/13d.png",
  620: "https://openweathermap.org/img/wn/13d.png",
  621: "https://openweathermap.org/img/wn/13d.png",
  622: "https://openweathermap.org/img/wn/13d.png",
  701: "https://openweathermap.org/img/wn/50d.png",
  711: "https://openweathermap.org/img/wn/50d.png",
  721: "https://openweathermap.org/img/wn/50d.png",
  731: "https://openweathermap.org/img/wn/50d.png",
  741: "https://openweathermap.org/img/wn/50d.png",
  751: "https://openweathermap.org/img/wn/50d.png",
  761: "https://openweathermap.org/img/wn/50d.png",
  762: "https://openweathermap.org/img/wn/50d.png",
  771: "https://openweathermap.org/img/wn/50d.png",
  781: "https://openweathermap.org/img/wn/50d.png",
  800: "https://openweathermap.org/img/wn/01d.png",
  801: "https://openweathermap.org/img/wn/02d.png",
  802: "https://openweathermap.org/img/wn/03d.png",
  803: "https://openweathermap.org/img/wn/04d.png",
  804: "https://openweathermap.org/img/wn/04d.png",
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