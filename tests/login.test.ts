import { jest, describe } from "@jest/globals";
import bcrypt from "bcrypt";
import {
  createdUserData,
  loginData,
  myAccountUser,
  token,
  userData,
} from "./mocks";
import loginRepositories from "../src/repositories/loginRepositories";
import { MyAccount, User } from "../src/types/user";
import loginServices from "../src/services/loginServices";
import jwt from "jsonwebtoken";
import { ErrorType } from "../src/types/error";

describe("Login tests", () => {
  describe("createUser", () => {
    it("should return created user object with id", async (): Promise<void> => {
      const hashedPassword = "asda123123sdas43da";
      const userToAdd: User = { ...userData, password: hashedPassword };

      jest.spyOn(bcrypt, "hash").mockImplementationOnce(() => hashedPassword);
      jest
        .spyOn(loginRepositories, "createUser")
        .mockResolvedValueOnce([createdUserData]);

      const result: User = await loginServices.createUser(userToAdd);

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
    it("should throw if user was not found", async (): Promise<void> => {
      jest.spyOn(loginRepositories, "findUser").mockResolvedValueOnce([]);

      try {
        await loginServices.verifyUser(loginData);
      } catch (error) {
        const myError: ErrorType = error as ErrorType;
        expect(myError.message).toBe("User doesn't exists");
      }
    });
    it("should throw if user is not active", async (): Promise<void> => {
      const inactiveUser: User = { ...createdUserData, active: false };
      jest
        .spyOn(loginRepositories, "findUser")
        .mockResolvedValueOnce([inactiveUser]);
      jest.spyOn(bcrypt, "compare").mockImplementationOnce(() => true);
      jest
        .spyOn(loginServices, "createToken")
        .mockResolvedValueOnce("aisdmqwurnu381j8d18hd1-");
      jest.spyOn(jwt, "sign").mockImplementationOnce(() => token);

      try {
        await loginServices.verifyUser(loginData);
      } catch (error) {
        const myError: ErrorType = error as ErrorType;
        expect(myError.message).toBe("User not active");
      }
    });
    it("should throw if password is incorrect", async (): Promise<void> => {
      jest
        .spyOn(loginRepositories, "findUser")
        .mockResolvedValueOnce([createdUserData]);
      jest.spyOn(bcrypt, "compare").mockImplementationOnce(() => false);
      jest
        .spyOn(loginServices, "createToken")
        .mockResolvedValueOnce("aisdmqwurnu381j8d18hd1-");
      jest.spyOn(jwt, "sign").mockImplementationOnce(() => token);

      try {
        await loginServices.verifyUser(loginData);
      } catch (error) {
        const myError: ErrorType = error as ErrorType;
        expect(myError.message).toBe("Incorrect password");
      }
    });
  });
  describe("patchUser", () => {
    it("should return created user object with id", async (): Promise<void> => {
      const hashedPassword = "asda123123sdas43da";
      const userToPatch: User = {
        ...userData,
        password: hashedPassword,
        id: 1,
      };

      jest.spyOn(bcrypt, "hash").mockImplementationOnce(() => hashedPassword);
      jest
        .spyOn(loginRepositories, "updateUser")
        .mockResolvedValueOnce([userToPatch]);

      const result: User = await loginServices.patchUser(1, userToPatch);

      expect(result).toMatchObject(userToPatch);
    });
    it("should throw if user was not found", async (): Promise<void> => {
      const hashedPassword = "asda123123sdas43da";
      const userToPatch: User = {
        ...userData,
        password: hashedPassword,
        id: 1,
      };

      jest.spyOn(bcrypt, "hash").mockImplementationOnce(() => hashedPassword);
      jest.spyOn(loginRepositories, "updateUser").mockResolvedValueOnce([]);

      try {
        await loginServices.patchUser(1, userToPatch);
      } catch (error) {
        const myError: ErrorType = error as ErrorType;
        expect(myError.message).toBe("User not found");
      }
    });
  });
  describe("getUserById", () => {
    it("should return user with given id", async (): Promise<void> => {
      jest
        .spyOn(loginRepositories, "getUserById")
        .mockResolvedValueOnce([myAccountUser]);

      const result: MyAccount = await loginServices.getUserById(1);

      expect(result).toMatchObject(myAccountUser);
    });
    it("should throw if user with give id does not exist", async (): Promise<void> => {
      jest.spyOn(loginRepositories, "getUserById").mockResolvedValueOnce([]);

      try {
        await loginServices.getUserById(1);
      } catch (error) {
        const myError: ErrorType = error as ErrorType;
        expect(myError.message).toBe("User not found");
      }
    });
  });
});
