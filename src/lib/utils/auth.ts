import { SignedUserIdJwtPayload } from "@/types/types";
import { getSession, verifySignUserId } from "../firebase/config/session";

export const authCurrentUser = async () => {
  try {
    const cookie = await getSession();
    if (!cookie) throw new Error("User not found");

    const userObj = (await verifySignUserId(cookie)) as SignedUserIdJwtPayload;

    if (!userObj) throw new Error("Invalid User Token");
    return userObj.uid;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
