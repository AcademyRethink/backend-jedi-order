import driversRepositories from "../src/repositories/driversRepositories";

describe("Drivers tests", () => {
  it("should return all drivers from database", async () => {
    const drivers = await driversRepositories.getAllDrivers();
    expect(drivers.length).toBeGreaterThan(1);
    expect(drivers[0]).toHaveProperty("id");
    expect(drivers[0]).toHaveProperty("driverName");
  });
  it("should return driver with given id", async () => {
    const drivers = await driversRepositories.getDriversById(1);
    expect(drivers[0].id).toBe(1);
  });
});
