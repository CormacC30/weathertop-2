import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { stationAnalytics } from "../utils/analytics.js";

export const weatherReport = {

    async latestReading(stations) {
        /*const latestReadings = [];
        for (const station of stations){
            const latestReading = await stationAnalytics.getLatestReading(station._id);
            latestReadings.push(latestReading);
        };
        return latestReadings;
        
        let latestReading = null;
        for(const station of stations){
          latestReading = await stationAnalytics.getLatestReading(station._id);
        };
        return latestReading;
        */
        const latestReadings = await Promise.all(
            stations.map(async (station) => {
              const latestReading = await stationAnalytics.getLatestReading(station._id);
              return {
                stationId: station._id,
                latestReading,
              };
            })
          );
        
          return latestReadings;
    },

    latestWeather(stations){
        /*
        function latestReading(stations) {
            const station = stations[0];
            for (let i = 0; i < stations.length; i++){
                station = station[i].stationAnalytics.getLatestReading(station[i]._id);
            };
            return station;
        };
        */
        const weatherData = {
            lastCode: latestReading.code,
            //lastWeatherIcon: stationAnalytics.weatherIcon(code),
            lastTemp: latestReading.temperature,
            //lastTempIcon: stationAnalytics.celciusToIcon(temperature),
           // lastFahrenheit: stationAnalytics.celciusToFahrenheit(temperature),
            lastWindSpeed: latestReading.windspeed,
            //lastBeaufort: stationAnalytics.beaufort(windspeed),
            lastWindDirection: latestReading.winddirection,
            lastPressure: latestReading.pressure,
        };
        return weatherData;

},

    getLatestCode(stationId){
        const latestReading = stationAnalytics.getLatestReading(stationId);
        return latestReading.code;
    },

    getLatestTemp(stationId){
        const latestReading = stationAnalytics.getLatestReading(stationId);
        return latestReading.temperature;
    },

    getLatestWindSpeed(stationId){
        const latestReading = stationAnalytics.getLatestReading(stationId);
        return latestReading.windspeed;
    },

    getLatestWindDirection(stationId){
        const latestReading = stationAnalytics.getLatestReading(stationId);
        return latestReading.winddirection;
    },

    getLatestPressure(stationId){
        const latestReading = stationAnalytics.getLatestReading(stationId);
        return latestReading.pressure;
    },

    getLatestFahreneheit(stationId){
        const latestReading = stationAnalytics.getLatestReading(stationId);
        return stationAnalytics.celciusToFahrenheit(latestReading.temperature);
    },

    getLatestBeaufort(stationId){
        const latestReading = stationAnalytics.getLatestReading(stationId);
        return stationAnalytics.beaufort(latestReading.windspeed);
    },

    getLatestWindChill(stationId){
        const latestReading = stationAnalytics.getLatestReading(stationId);
        return stationAnalytics.windChill(latestReading.temperature, latestReading.windspeed);
    },

    getLatestCompass(stationId){
        const latestReading = stationAnalytics.getLatestReading(stationId);
        return stationAnalytics.degreesToCompass(latestReading.winddirection);
    },

    getLatestTempIcon(stationId){
        const latestReading = stationAnalytics.getLatestReading(stationId);
        return stationAnalytics.celciusToIcon(latestReading.temperature);
    },

    getLatestWeatherIcon(stationId){
        const latestReading = stationAnalytics.getLatestReading(stationId);
        return stationAnalytics.weatherIcon(latestReading.code);
    },

    getLatestCodeToText(stationId){
        const latestReading = stationAnalytics.getLatestReading(stationId);
        return stationAnalytics.codeToText(latestReading.code);
    },

    };

