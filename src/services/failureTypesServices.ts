import failureTypeRepository from "../repositories/failureTypeRepository";

const failureTypeService = (
  repo: ReturnType<typeof failureTypeRepository>
) => ({
  getAllFailureTypes: async () => {
    const failureTypes = await repo.getAllFailureTypes();
    return failureTypes;
  },
  getFailureTypeById: async (id: number) => {
    const failureType = await repo.getFailureTypeById(id);
    return failureType;
  },
});

export default failureTypeService;
