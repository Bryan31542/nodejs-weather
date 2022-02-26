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

const showTaskToDelete = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const index = `${i + 1}`.green;
    return {
      value: task.id,
      name: `${index}. ${task.description}`,
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
      message: "Borrar".red,
      choices,
    },
  ];

  const { id } = await inquirer.prompt(question);
  return id;
};

const showCheckList = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const index = `${i + 1}`.green;
    return {
      value: task.id,
      name: `${index}. ${task.description}`,
      checked: task.completed ? true : false,
    };
  });

  const question = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione".green,
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(question);
  return ids;
};

const confirm = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  showTaskToDelete,
  confirm,
  showCheckList,
};
