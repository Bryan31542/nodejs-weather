const { green } = require("colors");
const inquirer = require("inquirer");
require("colors");

const questions = [
  {
    type: "list",
    name: "option",
    message: "Qué desea hacer?",
    choices: [
      {
        value: 1,
        name: `${"1.".green} Buscar ciudad`,
      },
      {
        value: 2,
        name: `${"2.".green} Historial`,
      },
      { value: 0, name: `${"0.".green} Salir` },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("====================================".green);
  console.log("\tSeleccion una opción");
  console.log("====================================\n".green);

  const { option } = await inquirer.prompt(questions);
  return option;
};

const pause = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"ENTER".green} para continuar`,
    },
  ];

  console.log("");
  await inquirer.prompt(question);
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) return "Por favor ingrese un valor";
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const showPlaces = async (places = []) => {
  const choices = places.map((place, i) => {
    const index = `${i + 1}`.green;
    return {
      value: place.id,
      name: `${index}. ${place.name}`,
    };
  });

  choices.unshift({
    value: "0",
    name: `0.`.green + ` Cancelar`,
  });

  const question = [
    {
      type: "list",
      name: "id",
      message: "Seleccione una ubicación:",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(question);
  return id;
};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  showPlaces,
};
