import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { maxMin } from "../utils/max-min.js";
import { stationAnalytics } from "../utils/analytics.js";

export const stationController = {
    async index(request, response) {
        const station = await stationStore.getStationById(request.params.id);
        const latestReading = await stationAnalytics.getLatestReading(request.params.id);
        const noReadings = stationAnalytics.noReadings(latestReading);
        const lastCode = latestReading.code;
        const lastTemp = latestReading.temperature;
        const lastWindSpeed = latestReading.windspeed;
        const lastWindDirection = latestReading.winddirection;
        const lastPressure = latestReading.pressure;
        const maxTemp = await maxMin.maxValue(station, `temperature`);
        const minTemp = await maxMin.minValue(station, `temperature`);
        const maxPressure = await maxMin.maxValue(station, `pressure`);
        const minPressure = await maxMin.minValue(station, `pressure`);
        const maxWind = await maxMin.maxValue(station, `windspeed`);
        const minWind = await maxMin.minValue(station, `windspeed`);
        const viewData = {
            title: "Station",
            station: station,
            id: station._id,
            latestCode: lastCode,
            latestTemperature: lastTemp,
            latestWindSpeed: lastWindSpeed,
            latestWindDirection: lastWindDirection,
            latestPressure: lastPressure,
            maxTemp: maxTemp,
            minTemp: minTemp,
            maxPressure: maxPressure,
            minPressure: minPressure,
            maxWind: maxWind,
            minWind: minWind,
            noReadings: noReadings,
        };
        response.render("station-view", viewData);
    },

    async addReading(request, response) {
        const station = await stationStore.getStationById(request.params.id);        
        const currentDateTime = new Date();

        const dateTime = stationAnalytics.formatDateTime(currentDateTime);
        const newReading = {
            code: Number(request.body.code),
            temperature: Number(request.body.temperature),
            windspeed: Number(request.body.windspeed),
            winddirection: Number(request.body.winddirection),
            pressure: Number(request.body.pressure),
            dateTime: dateTime,
        }
        console.log(`adding reading Code: ${newReading.code} Temperature: ${newReading.temperature} Wind Speed: ${newReading.windspeed}`);
        await readingStore.addReading(station._id, newReading);
        response.redirect("/station/" + station._id);
    },

    async deleteReading(request, response) {
        const stationId = request.params.stationid;
        const readingId = request.params.readingid;
        console.log(`Deleting reading ${readingId} from station ${stationId}`);
        await readingStore.deleteReading(request.params.readingId);
        response.redirect("/station/" + stationId);
    },
};