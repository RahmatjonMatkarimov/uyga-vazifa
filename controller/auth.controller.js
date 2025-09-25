const { v4 } = require("uuid");
const { read_file, write_file } = require("../utils/file_managment");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const users = read_file("users");
    if (!username || !password) {
      return res.status(400).json({
        massage: "barcha maydonni toldiring",
      });
    }

    const foundedUser = users.find((item) => item.username === username);

    if (foundedUser) {
      return res.status(400).json({
        massage: "bunday foydalanuvchi allaqachon mavjud",
      });
    }

    users.push({
      id: v4(),
      username,
      password: await bcryptjs.hash(password, 12),
    });

    write_file("users", users);
    res.status(201).json({
      massage: "yaratildi",
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const users = read_file("users");
    if (!username || !password) {
      return res.status(400).json({
        massage: "barcha maydonni toldiring",
      });
    }

    const foundedUser = users.find((item) => item.username === username);

    if (!foundedUser) {
      return res.status(400).json({
        massage: "bunday foydalanuvchi topilmadi",
      });
    }

    const decode = await bcryptjs.compare(password, foundedUser.password);
    if (!decode) {
      return res.status(400).json({
        massage: "parol xato",
      });
    }

    const body = {
      id: foundedUser.id,
    };
    const secret_key = process.env.SECRET_KEY;
    const token = jwt.sign(body, secret_key, { expiresIn: "1h" });
    res.status(201).json({
      massage: token,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
    login,
    register
}