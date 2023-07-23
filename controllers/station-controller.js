import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";

import { stationAnalytics } from "../utils/analytics.js"

export const stationController = {
    async index(request, response) {
        const station = await stationStore.getStationById(request.params.id);
        const latestReading = await stationAnalytics.getLatestReading(request.params.id);
        const lastCode = latestReading.code;
        const lastTemp = latestReading.temperature;
        const lastWindSpeed = latestReading.windspeed;
        const lastPressure = latestReading.pressure;
        const viewData = {
            title: "Station",
            station: station,
            latestCode: lastCode,
            latestTemperature: lastTemp,
            latestWindSpeed: lastWindSpeed,
            latestPressure: lastPressure,
        };
        response.render("station-view", viewData);
    },

    async addReading(request, response) {
        const station = await stationStore.getStationById(request.params.id);
        const newReading = {
            code: Number(request.body.code),
            temperature: Number(request.body.temperature),
            windspeed: Number(request.body.windspeed),
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