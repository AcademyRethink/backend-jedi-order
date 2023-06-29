import routes from "./routesData";
import knex, { Knex } from "knex";
import config from "./knexfile";

const knexInstance: Knex = knex(config);

const fillRouteData = async () => {
  for (const location of routes.beloHorizonteToPortoBarraDoRiacho) {
    await knexInstance("route3").insert({
      latitude: location.lat.toString(),
      longitude: location.lng.toString(),
    });
  }
};

fillRouteData();
