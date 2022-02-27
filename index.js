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

        // Mostrar resultados
        console.log("\nInformacion de la ciudad\n".magenta);
        console.log("Ciudad:", `${placeSelected.name}`.green);
        console.log("Latitud:", placeSelected.lat);
        console.log("Longitud:", placeSelected.lng);
        console.log("Temperatura:");
        console.log("Mínima:");
        console.log("Máxima:");

        break;
      case 2:
        break;
    }

    if (opt !== 0) await pause();
  } while (opt !== 0);
};

main();
