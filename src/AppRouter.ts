import { Router } from "express";

// пример реализации паттерна Singleton
export class AppRouter {
  private static router: Router;

  static get instance(): Router {
    if (!AppRouter.router) {
      AppRouter.router = Router();
    }

    return AppRouter.router;
  }
}
