const { write_file, read_file } = require("../utils/file_managment");

const getUsers = async (req, res) => {
  try {
    const users = read_file("users");
    res.status(200).send(users);
  } catch (error) {
    console.error(error);
  }
};
const getOneUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const users = read_file("users");
    const foundedusers = users.find((item) => item.id === id);

    if (!foundedusers) {
      return res.status(404).send({
        massage: "users not found",
      });
    }

    return res.status(200).send(foundedusers);
  } catch (error) {
    console.error(error);
  }
};

const putUsers = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const users = read_file("users");
    const foundedusers = users.find((item) => item.id === id);
    if (!foundedusers) {
      return res.status(404).json({
        massage: "not found",
      });
    }
    users.forEach((item) => {
      if (item.id === id) {
        item.name = name ? name : item.name;
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
const DeleteUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const users = read_file("users");
    const foundedusers = users.find((item) => item.id === id);
    if (!foundedusers) {
      return res.status(404).json({
        massage: "not found",
      });
    }
    users.forEach((item, index) => {
      if (item.id === id) {
        users.splice(index, 1);
      }
    });
    write_file("users", users);
    res.status(201).json({
      massage: "Ochirildi",
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getUsers,
  getOneUsers,
  putUsers,
  DeleteUsers,
};
