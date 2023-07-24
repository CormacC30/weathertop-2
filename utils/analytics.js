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
    if (reading !== "No Readings available") {
        return false;
    } else {
        return true;
    };
  },

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

};