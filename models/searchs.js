const fs = require("fs");
const axios = require("axios");

class Searchs {
  history = [];
  dbPath = "./db/database.json";

  constructor() {
    //TODO: read from DB
    this.readDB();
  }

  get historyCapitalized() {
    return this.history.map((h) => {
      let words = h.split(" ");
      words = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
      return words.join(" ");
    });
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: "es",
    };
  }

  get paramsWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: "metric",
      lang: "es",
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
      return resp.data.features.map((place) => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  async weatherPlace(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsWeather, lat, lon },
      });

      const resp = await instance.get();
      const { weather, main } = resp.data;

      return {
        description: weather[0].description,
        temp: main.temp,
        min: main.temp_min,
        max: main.temp_max,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async saveHistory(place = "") {
    // Si ya existe un lugar con el mismo nombre no se guarda
    if (this.history.includes(place.toLocaleLowerCase())) return;
    this.history = this.history.splice(0, 5);

    this.history.unshift(place.toLocaleLowerCase());

    // Guardar en DB
    this.saveDB();
  }

  saveDB() {
    const payload = {
      history: this.history,
    };

    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  readDB() {
    // Verificar si existe el archivo
    if (!fs.existsSync(this.dbPath)) return;

    const info = fs.readFileSync(this.dbPath, "utf8");

    const data = JSON.parse(info);

    this.history = data.history;
  }
}

module.exports = Searchs;
