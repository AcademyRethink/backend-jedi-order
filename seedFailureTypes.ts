import knex, { Knex } from "knex";
import config from "./knexfile";

const knexInstance: Knex = knex(config);

const fillFailureTypesData = async () => {
  const failureTypesData = [
    {
      failureType: "Rádio sem bateria",
    },
    {
      failureType: "Pane no sistema",
    },
    {
      failureType: "Controle inoperante",
    },
    {
      failureType: "Descarrilamento",
    },
  ];

  for (const failureType of failureTypesData) {
    await knexInstance("failure_types").insert({
      failure_type: failureType.failureType,
    });
  }
};

fillFailureTypesData();
