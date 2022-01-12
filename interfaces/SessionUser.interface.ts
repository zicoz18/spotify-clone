import { ISODateString } from "next-auth";

export default interface SessionUser {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  expires: ISODateString;
  accessToken?: string | null;
  refreshToken?: string | null;
}