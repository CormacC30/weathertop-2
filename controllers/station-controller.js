import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { maxMin } from "../utils/max-min.js";
import { stationAnalytics } from "../utils/analytics.js";
import { trends } from "../utils/trends.js";
import axios from "axios";

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
        const tempTrend = await trends.trend(station, `temperature`);
        const windTrend = await trends.trend(station, `windspeed`);
        const pressureTrend = await trends.trend(station, `pressure`);
        const chartLabels = await trends.trendData(request.params.id); //chart data
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
            tempTrend: tempTrend, //placeholder for trend icons
            windTrend: windTrend,
            pressureTrend: pressureTrend,
            noReadings: noReadings,
            chartData: chartLabels, //chart data
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

    async generateReport(request, response) {
        const station = await stationStore.getStationById(request.params.id);
        const currentDateTime = new Date();
        const dateTime = stationAnalytics.formatDateTime(currentDateTime);
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const lat = station.latitude;
        const lng = station.longitude;
        const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`;
        
        try {
            const result = await axios.get(requestUrl);
    
            if (result.status === 200) {
                const reading = result.data.current;
    
                const newReading = {
                    code: reading.weather[0].id,
                    temperature: reading.temp,
                    windspeed: reading.wind_speed,
                    winddirection: reading.wind_deg,
                    pressure: reading.pressure,
                    dateTime: dateTime,
                };
    
                await readingStore.addReading(station._id, newReading);
            }
    
            response.redirect("/station/" + station._id);
        } catch (error) {
            console.error("Error generating report:", error);
            // Handle error appropriately
        }
    },

    async deleteReading(request, response) {
        const stationId = request.params.stationid;
        const readingId = request.params.readingid;
        console.log(`Deleting reading ${readingId} from station ${stationId}`);
        await readingStore.deleteReading(request.params.readingId);
        response.redirect("/station/" + stationId);
    },
};