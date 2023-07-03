import { jest, describe } from "@jest/globals";
import bcrypt from "bcrypt";
import { createdUserData, loginData, token, userData } from "./mocks";
import loginRepositories from "../src/repositories/loginRepositories";
import { User } from "../src/types/user";
import loginServices from "../src/services/loginServices";
import jwt from "jsonwebtoken";

describe("Login tests", () => {
  describe("createUser", () => {
    it("should return created user object with id", async (): Promise<void> => {
      const hashedPassword = "asda123123sdas43da";
      const userToAdd: User = { ...userData, password: hashedPassword };

      jest.spyOn(bcrypt, "hash").mockImplementationOnce(() => hashedPassword);
      jest
        .spyOn(loginRepositories, "createUser")
        .mockResolvedValueOnce([createdUserData]);

      const result: User[] = await loginServices.createUser(userToAdd);

      expect(result).toMatchObject(createdUserData);
    });
  });
  describe("verifyUser", () => {
    it("should return created token", async (): Promise<void> => {
      jest
        .spyOn(loginRepositories, "findUser")
        .mockResolvedValueOnce([createdUserData]);
      jest.spyOn(bcrypt, "compare").mockImplementationOnce(() => true);
      jest
        .spyOn(loginServices, "createToken")
        .mockResolvedValueOnce("aisdmqwurnu381j8d18hd1-");
      jest.spyOn(jwt, "sign").mockImplementationOnce(() => token);

      const result: string | { message?: string; status: number } =
        await loginServices.verifyUser(loginData);

      expect(result).toMatch(token);
    });
  });
});
