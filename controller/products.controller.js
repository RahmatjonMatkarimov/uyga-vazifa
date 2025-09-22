const { write_file, read_file } = require("../utils/file_managment");
const uuid = require("uuid");

const getProducts = async (req, res) => {
  try {
    const data = read_file("data");
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
  }
};
const getOneProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const data = read_file("data");
    const foundedData = data.find((item) => item.id === id);

    if (!foundedData) {
      return res.status(404).send({
        massage: "data not found",
      });
    }

    return res.status(200).send(foundedData);
  } catch (error) {
    console.error(error);
  }
};
const PostProducts = async (req, res) => {
  try {
    const { name } = req.body;
    let data = read_file("data");
    if (name) {
      return res.status(400).send({
        massage: "name kiritilmagan",
      });
    }
    data.push({
      id: uuid.v4(),
      name,
    });
    write_file("data", data);
    return res.status(201).send({
      massage: "yaratildi",
    });
  } catch (error) {
    console.error(error);
  }
};
const putProducts = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const data = read_file("data");
    const foundedData = data.find((item) => item.id === id);
    if (!foundedData) {
      return res.status(404).json({
        massage: "not found",
      });
    }
    data.forEach((item) => {
      if (item.id === id) {
        item.name = name ? name : item.name;
      }
    });
    write_file("data", data);
    res.status(201).json({
      massage: "yangilandi",
    });
  } catch (error) {
    console.error(error);
  }
};
const DeleteProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const data = read_file("data");
    const foundedData = data.find((item) => item.id === id);
    if (!foundedData) {
      return res.status(404).json({
        massage: "not found",
      });
    }
    data.forEach((item, index) => {
      if (item.id === id) {
        data.splice(index, 1);
      }
    });
    write_file("data", data);
    res.status(201).json({
      massage: "Ochirildi",
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getProducts,
  getOneProducts,
  PostProducts,
  putProducts,
  DeleteProducts,
};
