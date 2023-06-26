import type { Knex } from "knex";
import * as dotenv from "dotenv";
dotenv.config();

const config: Knex.Config = {
  client: "pg",
  connection:
    "postgres://postgres:juh_backend1234@db.apsjoqmfusqhgxteepnu.supabase.co:6543/postgres",
  migrations: {
    directory: "src/database",
  },
};

export default config;
