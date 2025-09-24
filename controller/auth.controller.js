const { v4 } = require("uuid");
const { write_file, read_file } = require("../utils/file_managment");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return req.status(400).json({
        massage: "username va parol majburiy",
      });
    }
    const users = read_file("users");
    const foundedUser = users.find((item) => username === item.username);
    if (!foundedUser) {
      return res.status(400).json({ massage: "User topilmadi" });
    }
    const decode = await bcrypt.compare(password, foundedUser.password);
    if (decode) {
      const payload = {
        id: foundedUser.id,
        username: foundedUser.username,
        role: foundedUser.role,
      };
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });

      return res.status(200).json({
        token,
      });
    } else {
      return res.status(400).json({ massage: "parol notogri" });
    }
  } catch (error) {
    console.error(error);
  }
};

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        massage: "barcha malumotlar kiritilmagan",
      });
    }
    let users = read_file("users");
    const foundedUser = users.find((item) => item.username === username);
    if (foundedUser) {
      return res.status(401).json({
        massage: "bu foydalanuvchi allaqachon mavjud",
      });
    }
    users.push({
      id: v4(),
      username,
      password: await bcrypt.hash(password, 12),
      role: "user",
    });
    write_file("users", users);
    res.status(201).json({
      massage: "yaratildi",
    });
  } catch (error) {
    console.error(error);
  }
};

const updateRole = async (req, res) => {
  try {
    const { username, role } = req.body;
    if (!username || !role) {
      return res.status(400).json({
        massage: "barcha malumotlar kiritilmagan",
      });
    }
    let users = read_file("users");
    const foundedUser = users.find((item) => item.username === username);
    if (!foundedUser) {
      return res.status(401).json({
        massage: "bunday foydalanuvchi mavjud emas",
      });
    }

    users.forEach((item) => {
      if (item.username === foundedUser.username) {
        item.role = role;
      }
    });

    write_file("users", users);
    res.status(201).json({
      massage: "yangilandi",
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  register,
  login,
  updateRole
};