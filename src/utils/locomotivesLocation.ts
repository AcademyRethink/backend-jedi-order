import knex from "knex";
import { Knex } from "knex";
import config from "../../knexfile";
import routesRepositories from "../repositories/routesRepositories";

const knexInstance: Knex = knex(config);

export const simulateLocomotivesPosition = async () => {
  const locomotivesPosition =
    await routesRepositories.getCurrentLocomotivesPosition();

  const movelocomotivesPosition = async () => {
    for (let i = 0; i < locomotivesPosition.length; i++) {
      if (locomotivesPosition[i].status !== "Em movimento") continue;
      locomotivesPosition[i].index +=
        locomotivesPosition[i].direction === "up" ? 1 : -1;

      if (
        (locomotivesPosition[i].index === locomotivesPosition[i].maxIndex &&
          locomotivesPosition[i].direction === "up") ||
        (locomotivesPosition[i].index === 1 &&
          locomotivesPosition[i].direction === "down")
      ) {
        locomotivesPosition[i].direction =
          locomotivesPosition[i].direction === "up" ? "down" : "up";
      }
      const locomotivePositionToUpdate = { ...locomotivesPosition[i] };
      delete locomotivePositionToUpdate.status;

      await knexInstance("locomotivePosition")
        .update(locomotivePositionToUpdate)
        .where({ id: locomotivePositionToUpdate.id });
    }

    return locomotivesPosition;
  };

  setInterval(movelocomotivesPosition, 20000);
};
