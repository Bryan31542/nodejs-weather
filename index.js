require("dotenv").config();

const {
  readInput,
  inquirerMenu,
  pause,
  showPlaces,
} = require("./helpers/inquirer");
const Searchs = require("./models/searchs");

const main = async () => {
  const searchs = new Searchs();
  let opt = "";

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        // Mostrar mensaje
        const placeToSearch = await readInput("Ingrese una Ciudad:");

        // Buscar lugares
        const places = await searchs.city(placeToSearch);

        // Seleccionar lugar
        const idSelected = await showPlaces(places);
        const placeSelected = places.find((p) => p.id === idSelected);

        // Clima
        const weather = await searchs.weatherPlace(
          placeSelected.lat,
          placeSelected.lng
        );

        // Mostrar resultados
        console.clear();
        console.log("\nInformacion de la ciudad\n".green);
        console.log("Ciudad:", `${placeSelected.name}`.yellow);
        console.log("Latitud:", placeSelected.lat);
        console.log("Longitud:", placeSelected.lng);
        console.log("Temperatura:", weather.temp, "°C".yellow);
        console.log("Mínima:", weather.min, "°C".yellow);
        console.log("Máxima:", weather.max, "°C".yellow);
        console.log("Descripción:", `${weather.description}`.yellow);

        break;
      case 2:
        break;
    }

    if (opt !== 0) await pause();
  } while (opt !== 0);
};

main();
