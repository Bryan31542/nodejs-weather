const { readInput, inquirerMenu, pause } = require("./helpers/inquirer");
const Searchs = require("./models/searchs");

const main = async () => {
  const searchs = new Searchs();
  let opt = "";

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        // Mostrar mensaje
        const place = await readInput("Ingrese una Ciudad:");
        await searchs.city(place);

        // Buscar lugares

        // Seleccionar lugar

        // Clima

        // Mostrar resultados
        console.log("\nInformacion de la ciudad\n".magenta);
        console.log("Ciudad:");
        console.log("Latitud:");
        console.log("Longitud:");
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
