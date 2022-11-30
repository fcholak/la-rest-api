import { DocumentDefinition } from "mongoose";
import Session, { SessionDocument } from "../models/session.model";

export async function createSession(userId: string, userAgent: string) {
  try {
    const session = await Session.create({
      user: userId,
      userAgent: userAgent,
    });

    console.log(session);
    return session.toJSON();
  } catch (e: any) {
    throw new Error(e);
  }
}
