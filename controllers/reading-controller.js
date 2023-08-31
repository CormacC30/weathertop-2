import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { stationAnalytics } from "../utils/analytics.js";

export const readingController = {
    async index(request, response) {
      const stationId = request.params.stationid;
      const readingId = request.params.readingid;
      console.log(`Editing Reading ${readingId} from station ${stationId}`);
      const viewData = {
        title: "Edit Reading",
        station: await stationStore.getStationById(stationId),
        reading: await readingStore.getReadingById(readingId),
      };
      response.render("reading-view", viewData);
    },
  /*update a reading, takes in new updated fields input by user and
   uses updateReading to write in the updated reading to database*/
    async update(request, response) {
      const stationId = request.params.stationid;
      const readingId = request.params.readingid;
      const updatedReading = {
        code: Number(request.body.code),
        temperature: Number(request.body.temperature),
        windspeed: Number(request.body.windspeed),
        winddirection: Number(request.body.winddirection),
        pressure: Number(request.body.pressure),
      };
      console.log(`Updating Reading ${readingId} from Station ${stationId}`);
      const reading = await readingStore.getReadingById(readingId);
      await readingStore.updateReading(readingId, updatedReading);
      response.redirect("/station/" + stationId);
    },
  };