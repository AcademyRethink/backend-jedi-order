import { Router } from "express";
import Knex from "knex";
import failureTypeController from "../controllers/failureTypeController";
import failureTypeService from "../services/failureTypesServices";
import failureTypeRepository from "../repositories/failureTypeRepository";
import knexConfig from "../../knexfile";
import tokenAuth from "../middlewares/tokenAuthetication";

const router = Router();

const knex = Knex(knexConfig);

const repository = failureTypeRepository(knex);
const service = failureTypeService(repository);

const controller = failureTypeController(service);

router.use(tokenAuth.authToken);

router.get("/", controller.getAllFailureTypes);
router.get("/:id", controller.getFailureTypeById);

export { router };
