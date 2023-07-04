import { Request, Response } from "express";
import failureTypeService from "../services/failureTypesServices";

const failureTypeController = (
  service: ReturnType<typeof failureTypeService>
) => ({
  getAllFailureTypes: async (_req: Request, res: Response) => {
    const failureTypes = await service.getAllFailureTypes();
    res.json(failureTypes);
  },
  getFailureTypeById: async (req: Request, res: Response) => {
    const { id } = req.params;
    const failureType = await service.getFailureTypeById(Number(id));
    if (!failureType) {
      return res.status(404).json({ message: "Failure type not found" });
    }
    return res.json(failureType);
  },
});

export default failureTypeController;
