import { stationAnalytics } from "../utils/analytics.js";

export const handlebarsHelpers = {
    celciusToFahrenheit: stationAnalytics.celciusToFahrenheit,
    windChill: stationAnalytics.windChill,
    beaufort: stationAnalytics.beaufort,
    degreesToCompass: stationAnalytics.degreesToCompass,
  };
