import { Knex } from "knex";

const failureTypeRepository = (knex: Knex) => ({
  getAllFailureTypes: () => knex.select("*").from("failure_types"),
  getFailureTypeById: (id: number) =>
    knex.select("*").from("failure_types").where({ id }).first(),
});

export default failureTypeRepository;
