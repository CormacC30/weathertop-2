import { readingStore } from "../models/reading-store.js";

export const maxMin = {
/* Reusable code that take in station and a property
and returns max and min values from array of readings*/
    async maxValue(station, property) {
        const readings = await readingStore.getReadingsByStationId(station._id);
        if (readings.length < 2) {
            return "Not enough data";
        } else {
            let maxVal = readings[0][property];
            for (let i = 0; i < readings.length; i++) {
                const value = readings[i][property];
                if (value > maxVal) {
                    maxVal = value;
                }
            }
            return maxVal;
        }

        
    },

    async minValue(station, property) {
        const readings = await readingStore.getReadingsByStationId(station._id);
        if (readings.length < 2) {
            return "Not enough data";
        } else {
            let minVal = readings[0][property];
            for (let i = 0; i < readings.length; i++) {
                const value = readings[i][property];
                if (value < minVal) {
                    minVal = value;
                }
            }
            return minVal;
        }
        
    },

};