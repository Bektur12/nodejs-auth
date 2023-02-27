import { Router } from "express";
import authController from "./authController.js";
import { check } from "express-validator";
import authMiddleware from "../server/middleware/authMiddleware.js";
import roleMiddleware from "../server/middleware/roleMiddleware.js";
const router = new Router();

router.post(
  "/registration",
  [
    check("username", "Имя пользователя не может быть пустым").notEmpty(),
    check(
      "password",
      "Пароль должен быть более 4 и меньше 18 символов"
    ).isLength({ min: 4, max: 10 }),
  ],
  authController.registration
);
router.post("/login", authController.login);
router.get(
  "/users",
  roleMiddleware(["USER", "ADMIN"]),
  authController.getUsers
);

export default router;
