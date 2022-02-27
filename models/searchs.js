const axios = require("axios");

class Searchs {
  history = [];

  constructor() {
    //TODO: read from DB
  }

  get paramsMapbox() {
    return {
      params: {
        access_token:
          "pk.eyJ1IjoiYnJ5YW4zMTU0MiIsImEiOiJjbDA0aTQ0am4wMHd4M2RtZHZxajRiaWU1In0.5YTT8qZODwGkk-XMvAcxag",
        limit: 5,
        language: "es",
      },
    };
  }

  async city(place = "") {
    try {
      // Peticion http
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapbox,
      });

      const resp = await instance.get();

      console.log(resp.data);
    } catch (error) {
      return [];
    }
  }
}

module.exports = Searchs;
