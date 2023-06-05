import { Router } from "express";

import { productsRouter } from "./products.router.js";
import { cartsrouter} from "./carts.router.js";
import { sessionsRouter} from "./sessions.router.js";
import { viewsRouter } from "./views.router.js";

export function routerApi(app) {
  const router = Router();
  app.use("/api/v1", router);

  router.use("/carts", cartsrouter);
  router.use("/products", productsRouter);
  router.use("/views", viewsRouter);
  router.use("/sessions", sessionsRouter);
}