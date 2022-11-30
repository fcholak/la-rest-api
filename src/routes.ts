import { Express, Request, Response } from "express";
import { createUserHandler } from "../src/controller/user.controller";
import validateResource from "../src/middleware/validateResource";
import { createUserSchema } from "./schema/user.schema";
import { createSessionSchema } from "./schema/session.schema";
import { createSessionHandler } from "./controller/session.controller";

function routes(app: Express) {
  app.get("/api/health-check", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  app.post(
    "/api/session",
    validateResource(createSessionSchema),
    createSessionHandler
  );

  app.get("/api/sessions");
}

export default routes;
