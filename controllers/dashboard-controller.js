import { stationStore } from "../models/station-store.js";
import { stationAnalytics } from "../utils/analytics.js";
import { accountsController } from "./accounts-controller.js";
import { weatherReport } from "../models/weather-report.js";

export const dashboardController = {

  async index(request, response) {  

    const loggedInUser = await accountsController.getLoggedInUser(request);
    const stations = await stationStore.getStationsByUserId(loggedInUser._id);
    
    for(const station of stations){
      const latestReading = await stationAnalytics.getLatestReading(station._id);
      station.latestReading = latestReading;
      const noReadings = stationAnalytics.noReadings(latestReading);
      station.noReadings = noReadings;
    };

    const viewData = {
      title: "Station Dashboard",
      stations: stations,
    };

    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);

  },

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
  
  async deleteStation(request, response) {
    const stationId = request.params.id;
    console.log(`Deleting station called: ${stationId}`);
    await stationStore.deleteStationById(stationId);
    response.redirect("/dashboard");
  },
};
