import { Knex } from "knex";
import failureTypeRepository from "../src/repositories/failureTypeRepository";

describe("FailureTypeRepository", () => {
  let repo: ReturnType<typeof failureTypeRepository>;

  beforeAll(() => {
    const knexMock = {} as Knex;
    repo = failureTypeRepository(knexMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllFailureTypes", () => {
    it("should call the getAllFailureTypes function", async () => {
      const expectedFailureTypes = [{ id: 1, name: "Failure Type 1" }];
      repo.getAllFailureTypes = jest
        .fn()
        .mockResolvedValue(expectedFailureTypes);

      const result = await repo.getAllFailureTypes();

      expect(repo.getAllFailureTypes).toHaveBeenCalled();

      expect(result).toEqual(expectedFailureTypes);
    });
  });

  describe("getFailureTypeById", () => {
    it("should call the getFailureTypeById function with the correct ID", async () => {
      const id = 1;

      const expectedFailureType = { id: 1, name: "Failure Type 1" };
      repo.getFailureTypeById = jest
        .fn()
        .mockResolvedValue(expectedFailureType);

      const result = await repo.getFailureTypeById(id);

      expect(repo.getFailureTypeById).toHaveBeenCalledWith(id);

      expect(result).toEqual(expectedFailureType);
    });
  });
});
