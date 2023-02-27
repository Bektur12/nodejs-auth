import User from "../server/models/User.js";
import Role from "../server/models/Role.js";
import bcrypt from "bcryptjs";

class authController {
  async registration(req, res) {
    try {
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
    try {
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Login error" });
    }
  }
  async getUsers(req, res) {
    try {
    } catch (e) {}
  }
}

export default new authController();
