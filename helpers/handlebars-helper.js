import { stationAnalytics } from "../utils/analytics.js";
import { weatherReport } from "../models/weather-report.js";

export const handlebarsHelpers = {
    celciusToFahrenheit: stationAnalytics.celciusToFahrenheit,
    windChill: stationAnalytics.windChill,
    beaufort: stationAnalytics.beaufort,
    degreesToCompass: stationAnalytics.degreesToCompass,
    weatherIcon: stationAnalytics.weatherIcon,
    celciusToIcon: stationAnalytics.celciusToIcon,
    codeToText: stationAnalytics.codeToText,
    getLatestReading: stationAnalytics.getLatestReading,
    getLatestCode: weatherReport.getLatestCode,
    getLatestTemp: weatherReport.getLatestTemp,
    getLatestWindSpeed: weatherReport.getLatestWindSpeed,
    getLatestWindDirection: weatherReport.getLatestWindDirection,
    getLatestPressure: weatherReport.getLatestPressure,
    getLatestFahreneheit: weatherReport.getLatestFahreneheit,
    getLatestBeaufort: weatherReport.getLatestBeaufort,
    getLatestWindChill: weatherReport.getLatestWindChill,
    getLatestCompass: weatherReport.getLatestCompass,
    getLatestTempIcon: weatherReport.getLatestTempIcon,
    getLatestWeatherIcon: weatherReport.getLatestWeatherIcon,
    getLatestCodeToText: weatherReport.getLatestCodeToText
  };
