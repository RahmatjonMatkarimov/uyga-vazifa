const { v4 } = require("uuid");
const { read_file, write_file } = require("../utils/file_managment");

const getList = (req, res) => {
  try {
    const data = read_file("data");
    const id = req.user.id;
    const foundedData = data.filter((item) => item.ownerId === id);

    if (!foundedData) {
      return res.status(404).json({
        massage: "data not found",
      });
    }

    res.status(200).json(foundedData);
  } catch (error) {
    res.status(500).json(error);
  }
};
const PostList = (req, res) => {
  try {
    const data = read_file("data");
    const id = req.user.id;
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        massage: "barcha maydonlarni toldiring",
      });
    }

    data.push({
      id: v4(),
      ownerId: id,
      checket: false,
      title,
    });

    write_file("data", data);

    res.status(201).json({
      massage: "yaratildi",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
const PutList = (req, res) => {
  try {
    const data = read_file("data");
    const { id } = req.params;
    const { title, checket } = req.body;

    const foundedData = data.find((item) => item.id === id);

    if (!foundedData) {
      return res.status(404).json({
        massage: "data not found",
      });
    }
    if (foundedData.ownerId !== req.user.id) {
      return res.status(403).json({
        massage: "bu to do ni siz yaratmagansiz",
      });
    }

    data.forEach((item) => {
      if (item.id === id) {
        item.title = title ? title : item.title;
        item.checket = checket !== undefined ? checket : item.checket;
      }
    });

    write_file("data", data);

    res.status(201).json({
      massage: "yangilandi",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
const DeleteList = (req, res) => {
  try {
    const data = read_file("data");
    const { id } = req.params;

    const foundedData = data.find((item) => item.id === id);

    if (!foundedData) {
      return res.status(404).json({
        massage: "data not found",
      });
    }
    if (foundedData.ownerId !== req.user.id) {
      return res.status(403).json({
        massage: "bu to do ni siz yaratmagansiz",
      });
    }

    data.forEach((item, index) => {
      if (item.id === id) {
        data.splice(index, 1);
      }
    });

    write_file("data", data);
    res.status(201).json({
      massage: "ochirildi",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
const DeleteChecket = (req, res) => {
  try {
    const data = read_file("data");
    const id = req.user.id;

    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].ownerId === id && data[i].checket === true) {
        data.splice(i, 1);
      }
    }

    write_file("data", data);
    res.status(201).json({
      massage: "ochirildi",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
const Checket = (req, res) => {
  try {
    const data = read_file("data");
    const id = req.user.id;
    const foundedData = data.filter((item) => item.ownerId === id);

    if (!foundedData) {
      return res.status(404).json({
        massage: "data not found",
      });
    }
    const result = {
      ChecketTrue: 0,
      ChecketFalse: 0,
    };

    foundedData.forEach((item) => {
      if (item.checket) {
        result.ChecketTrue += 1;
      }else{
        result.ChecketFalse += 1;
      }
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getList,
  PostList,
  PutList,
  DeleteChecket,
  Checket,
  DeleteList,
};
