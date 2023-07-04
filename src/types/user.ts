import { JwtPayload } from "jsonwebtoken";
type User = {
  id?: string | number;
  name: string;
  email: string;
  password: string;
  permission: boolean;
  active: boolean;
  image?: string | undefined;
  date_created?: Date | undefined;
  date_updated?: Date | undefined;
};

type LoginRequest = {
  email: string;
  password: string;
};

type MyAccount = {
  id?: string | number;
  name: string;
  email: string;
  password: string;
  active: boolean;
};

interface TokenPayload extends JwtPayload {
  id: number;
  email: string;
  permission: boolean;
  iat: number;
  exp: number;
}

export { User, LoginRequest, TokenPayload, MyAccount };
