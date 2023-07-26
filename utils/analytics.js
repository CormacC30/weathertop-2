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

  //intended for dashboard view
  async displayLastReadingByStation(list) {
    const latestReadings = await Promise.all(
      list.map(async (station) => {
        const latestReading = await this.getLatestReading(station._id);
        return {
          stationId: station._id,
          latestReading,
        };
      })
    );

    return latestReadings;
  },

celciusToFahrenheit(temperature) {
    return ((temperature * 9 / 5) + 32);
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

};