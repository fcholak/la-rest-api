import { Request, Response } from "express";
import { createSession } from "../service/session.service";
import { validatePassword } from "./user.controller";
import { signJwt } from "../utils/jwt.utils";
import config from "config";

export async function createSessionHandler(req: Request, res: Response) {
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(404).send("User not found.");
  }

  const session = await createSession(user._id, req.get("userAgent") || "");

  // Access token
  const accessToken = signJwt(
    {
      ...user,
      session: session._id,
    },
    {
      expiresIn: config.get<string>("accessTokenTTL"),
    }
  );

  const refreshToken = signJwt(
    {
      ...user,
      session: session._id,
    },
    {
      expiresIn: config.get<string>("refreshTokenTTL"),
    }
  );

  console.log(accessToken);
  console.log(refreshToken);

  return res.send({ accessToken, refreshToken });
}
