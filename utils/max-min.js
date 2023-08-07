import { readingStore } from "../models/reading-store.js";
import { stationStore } from "../models/station-store.js";

export const maxMin = {

async maxValue(station, property) {
    const readings = await readingStore.getReadingsByStationId(station._id);
    let maxVal = readings[0][property];
    for (let i = 0; i < readings.length; i++) {
        const value = readings[i][property];
        if (value > maxVal) {
            maxVal = value;
        }
    }
    return maxVal;
},

async minValue(station, property) {
    const readings = await readingStore.getReadingsByStationId(station._id); 
    let minVal = readings[0][property];
    for (let i = 0; i < readings.length; i++) {
        const value = readings[i][property];
        if (value < minVal) {
            minVal = value;
        }
    }
    return minVal;
},
    
};