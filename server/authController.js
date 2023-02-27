import User from "../server/models/User.js";
import Role from "../server/models/Role.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import secret from "./config.js";

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret.secret, { expiresIn: "24h" });
};
class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Ошибка при регистрации", errors });
      }
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким именем уже существует" });
      }
      const hasPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: "USER" });
      console.log(userRole, "rollle");
      const user = new User({
        username,
        password: hasPassword,
        roles: [userRole.value],
      });
      await user.save();
      return res.json({ message: "Пользователь был успешно зарегистрирован" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration error" });
    }
  }
  async login(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ message: `Пользователь ${username} не найден` });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Введен неверный пароль" });
    }
    const token = generateAccessToken(user._id, user.roles);
    return res.json({ token });
  }
  async getUsers(req, res) {
    const users = await User.find();
    res.json(users);
    try {
    } catch (e) {}
  }
}

export default new authController();
