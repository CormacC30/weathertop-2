import { stationStore } from "../models/station-store.js"
import { readingStore } from "../models/reading-store.js";

export const stationAnalytics ={

async getLatestReading(stationId) {
    const readings = await readingStore.getReadingsByStationId(stationId);
    if (readings.length > 0) {
      return readings[readings.length - 1];

      const {code, temperature, windspeed, pressure} = latestReading;
      const data = { code, temperature, windspeed, pressure };
    }
    else {
        return null;
    };
  },

async getLatestTemp(station){
    return this.getLatestReading(station).temperature;
},

async getLatestCode(station){
    return this.getLatestReading(station).code;
},

async getLatestWind(station){
    return this.getLatestReading(station).windspeed;
},

async getLatestPressure(station){
    return this.getLatestPressure(station).pressure;
},

};