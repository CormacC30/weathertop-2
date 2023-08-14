import { stationAnalytics } from "../utils/analytics.js";
import { maxMin } from "../utils/max-min.js";

export const handlebarsHelpers = {
    celciusToFahrenheit: stationAnalytics.celciusToFahrenheit,
    windChill: stationAnalytics.windChill,
    beaufort: stationAnalytics.beaufort,
    degreesToCompass: stationAnalytics.degreesToCompass,
    weatherIcon: stationAnalytics.weatherIcon,
    celciusToIcon: stationAnalytics.celciusToIcon,
    codeToText: stationAnalytics.codeToText,
    dateFormatter: stationAnalytics.formatDateTime,
    openWeatherIcon: stationAnalytics.openWeatherIcon,
  };
