import { readingStore } from "../models/reading-store.js";
import { stationStore } from "../models/station-store.js";

export const maxMin = {
    max(values) {
        let max = values[0];
        for (let i = 0; i < values.length; i++) {
            if (values[i] > max) {
                max = values[i];
            };
        };
        return max;
    },

    async min(values) {
        let min = values[0];
        for (let i = 0; i < values.length; i++) {
            if (values[i] < min) {
                min = values[i];
            };
        };
        return min;
    },
/*
    maxTemp: (stationid) => {
        const values = readingStore.getReadingsByStationId(stationid);
        console.log("values:", values); // Check the value of 'values'
    
        // Check if 'values' is an array and contains data
        if (!Array.isArray(values) || values.length === 0) {
            console.error("Invalid or empty readings array.");
            return null; // or appropriate error handling
        }
    
        const temperatures = values.map(reading => reading.temperature);
        console.log("temperatures:", temperatures); // Check the value of 'temperatures'
    
        return maxMin.max(temperatures); // Call the max function using the maxMin object
    },
    */

    async maxTemp(stationid) {
        console.log("stationid:", stationid); // Check the value of 'stationid'
        const values = await stationStore.getStationById(stationid);
        const list = values.readings;
        const temperatures = list.map(reading => reading.temperature);
        console.log("temperatures:", temperatures); // Check the value of 'temperatures'
        const maxTemperature = maxMin.max(temperatures);
        return { maxTemperature };
    },
    

    async minTemp(stationid) {
        console.log("stationid:", stationid); // Check the value of 'stationid'
        const values = await stationStore.getStationById(stationid);
        const list = values.readings;
        const temperatures = list.map(reading => reading.temperature);
        console.log("temperatures:", temperatures); // Check the value of 'temperatures'
        const minTemperature = maxMin.min(temperatures);
        return { minTemperature };
    },
    
};