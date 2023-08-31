import { stationStore } from "../models/station-store.js";
import { stationAnalytics } from "../utils/analytics.js";
import { accountsController } from "./accounts-controller.js";
import { maxMin } from "../utils/max-min.js";
import { trends } from "../utils/trends.js";

export const dashboardController = {

  async index(request, response) {  

    const loggedInUser = await accountsController.getLoggedInUser(request);
    const stations = await stationStore.getStationsByUserId(loggedInUser._id);
    /*loops through all stations in the array of stations to get latest reading
    max, min, and trend icons for each - in order to display on dashboard*/
    for(const station of stations){
      const latestReading = await stationAnalytics.getLatestReading(station._id);
      station.latestReading = latestReading;
      const noReadings = stationAnalytics.noReadings(latestReading);
      station.noReadings = noReadings;
      station.maxTemp = await maxMin.maxValue(station, `temperature`);
      station.minTemp = await maxMin.minValue(station, `temperature`);
      station.maxPressure = await maxMin.maxValue(station, `pressure`);
      station.minPressure = await maxMin.minValue(station, `pressure`);
      station.maxWind = await maxMin.maxValue(station, `windspeed`);
      station.minWind = await maxMin.minValue(station, `windspeed`);
      station.tempTrend = await trends.trend(station, `temperature`);
      station.windTrend = await trends.trend(station, `windspeed`);
      station.pressureTrend = await trends.trend(station, `pressure`);
    };
//sort the stations in alphabetical order
    stations.sort((a, b) => a.name.localeCompare(b.name));

    const viewData = {
      title: "Station Dashboard",
      stations: stations,
    };

    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);

  },
//add a station
  async addStation(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const newStation = {
      name: request.body.name,
      latitude: Number(request.body.latitude),
      longitude: Number(request.body.longitude),
      userid: loggedInUser._id,
    };
    console.log(`adding station ${newStation.name}`);
    await stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },
  
  //delete a station
  async deleteStation(request, response) {
    const stationId = request.params.id;
    console.log(`Deleting station called: ${stationId}`);
    await stationStore.deleteStationById(stationId);
    response.redirect("/dashboard");
  },
};
