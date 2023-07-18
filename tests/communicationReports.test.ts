import communicationReportController from "../src/controllers/communicationReportController";
import { mockReports, mockNewReport } from "./mocks";

interface MockResponse {
  status: jest.Mock;
  json: jest.Mock;
}

const mockResponse = (): MockResponse => {
  const res: Partial<MockResponse> = {};
  res.status = jest.fn();
  res.json = jest.fn();
  res.status.mockReturnValue(res);
  res.json.mockReturnValue(res);
  return res as MockResponse;
};

describe("communicationReportController", () => {
  let service: any;
  let controller: any;

  beforeEach(() => {
    service = jest.fn().mockReturnValue({
      getReports: jest.fn(),
      createReport: jest.fn(),
      getReportById: jest.fn(),
    });
    controller = communicationReportController(service());
  });

  it("should fetch all reports", async () => {
    service().getReports.mockResolvedValue(mockReports);

    const res = mockResponse();

    await controller.getAllReports(null, res);

    expect(service().getReports).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockReports);
  });

  it("should create a report", async () => {
    service().createReport.mockResolvedValue(mockNewReport);

    const mockRequest = {
      body: { ...mockNewReport },
    };

    const res = mockResponse();

    await controller.createReport(mockRequest, res);
    expect(service().createReport).toHaveBeenCalledWith(mockRequest.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockNewReport);
  });
});
