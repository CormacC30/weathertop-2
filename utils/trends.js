import { readingStore } from "../models/reading-store.js";
import { stationStore } from "../models/station-store.js";
import axios from "axios";

export const trends = {
//logic for calculating trends 
    calcTrend(values) {
        let trend = 0;
        if (values.length > 2) {
            if ((values[2] > values[1]) && (values[1] > values[0])) {
                trend = 1;
            } else if ((values[2] < values[1]) && (values[1]) < values[0]) {
                trend = -1;
            }
        } return trend;
    },

//returns the font awesome icon for increasing/decreasing trends (of any property)
    async trend(station, property) {

        let trend = 0;
        let icon = "";
        const readings = await readingStore.getReadingsByStationId(station._id);
        let values = [];
        if (readings.length > 2) {
            let size = readings.length;
            values = [readings[size - 3][property], readings[size - 2][property], readings[size - 1][property]];
            trend = this.calcTrend(values);
        }
        if (trend === 1) {
            icon = "fa-solid fa-arrow-up";
        } else if (trend === -1) {
            icon = "fa-solid fa-arrow-down";
        } else {
            icon = "";
        } return icon;
    },

//Used for the trend chart in station-view.
/*Creates an array of data from json file retrieved from API, 
then creates subarrays for temperature data and time (daily in this case)
Could be reused for other parameters such as precipitation - didn't do this 
in interest of time.*/
    async trendData(stationid){
        let report =[];
        const station = await stationStore.getStationById(stationid);
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const lat = station.latitude;
        const lng = station.longitude;
        const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`;
        const result = await axios.get(requestUrl);
        if (result.status == 200){
            report.tempTrend = [];
            report.trendLabels = [];
            const trends = result.data.daily;
            for(let i=0; i < trends.length; i++) {
                report.tempTrend.push(trends[i].temp.day);
                const date = new Date(trends[i].dt*1000);
                report.trendLabels.push(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`);
            }
        }
        return report;
    },
};