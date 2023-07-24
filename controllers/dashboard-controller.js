import { stationStore } from "../models/station-store.js";
import { stationAnalytics } from "../utils/analytics.js";

export const dashboardController = {
  async index(request, response) {
    const stationList = await stationStore.getAllStations();

    const viewData = {
      title: "Station Dashboard",
      stations: stationList,
    };

    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },

  async addStation(request, response) {
    const newStation = {
      name: request.body.name,
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
