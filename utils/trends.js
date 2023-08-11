import { readingStore } from "../models/reading-store.js";

export const trends = {

    calcTrend(values){
        let trend = 0;
        if (values.length > 2) {
            if((values[2] > values[1]) && (values[1] > values[0])){
                trend = 1;
            } else if ((values[2] < values[1]) && (values[1]) < values[0]){
                trend = -1;
            }
            } return trend;
        },
    

    async trend(station, property) {

        let trend = 0;

        const readings = await readingStore.getReadingsByStationId(station._id);
        let values = [];
        if (readings.length > 2){
            let size = readings.length;
            values = [readings[size-3][property], readings[size-2][property], readings[size-1][property]];
            trend = this.calcTrend(values);
        } return trend;
    }
};