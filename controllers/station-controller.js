import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";

import { stationAnalytics } from "../utils/analytics.js";

export const stationController = {
    async index(request, response) {
        const station = await stationStore.getStationById(request.params.id);
        const latestReading = await stationAnalytics.getLatestReading(request.params.id);
        const noReadings = stationAnalytics.noReadings(latestReading);
        const lastCode = latestReading.code;
        const lastTemp = latestReading.temperature;
        const lastFahrenheit = latestReading.fahrenheit;
        const lastWindSpeed = latestReading.windspeed;
        const lastBeaufort = latestReading.beaufort;
        const lastWindDirection = latestReading.winddirection;
        const lastPressure = latestReading.pressure;
        const viewData = {
            title: "Station",
            station: station,
            latestCode: lastCode,
            latestTemperature: lastTemp,
            latestFahrenheit: lastFahrenheit,
            latestWindSpeed: lastWindSpeed,
            latestBeaufort: lastBeaufort,
            latestWindDirection: lastWindDirection,
            latestPressure: lastPressure,
            noReadings: noReadings,
        };
        response.render("station-view", viewData);
    },

    async addReading(request, response) {
        const station = await stationStore.getStationById(request.params.id);
        //const beaufort = await stationAnalytics.beaufort(request.body.beaufort);
        const newReading = {
            code: Number(request.body.code),
            temperature: Number(request.body.temperature),
            fahrenheit: Number(stationAnalytics.celciusToFahrenheit(request.body.temperature)),
            windspeed: Number(request.body.windspeed),
            beaufort: Number(stationAnalytics.beaufort(request.body.windspeed)),
            winddirection: Number(request.body.winddirection),
            pressure: Number(request.body.pressure),
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