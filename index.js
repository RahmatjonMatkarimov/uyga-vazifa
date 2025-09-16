const express = require("express");
const { read_file, write_file } = require("./utils/file_managment");
const uuid = require("uuid");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());

////////////////////////////////////////// fruits
app.get("/fruits", (req, res) => {
  res.status(200).send(read_file("fruits.json"));
});

app.post("/fruits", (req, res) => {
  const { name } = req.body;
  let fruits = read_file("fruits.json");
  if (name) {
    fruits.push({
      id: uuid.v4(),
      name,
    });
    write_file("fruits.json", fruits);
    return res.status(201).send({
      massage: "yaratildi",
    });
  }

  return res.status(400).send({
    massage: "name kiritilmagan",
  });
});

app.get("/fruits/:id", (req, res) => {
  const { id } = req.params;
  const fruits = read_file("fruits.json");
  const foundedfruits = fruits.find((item) => item.id === id);
  if (foundedfruits) {
    return res.status(200).send(foundedfruits);
  }
  return res.status(404).send({
    massage: "fruits not found",
  });
});

app.put("/fruits", (req, res) => {
  const { name, id } = req.body;
  const fruits = read_file("fruits.json");
  const foundedfruits = fruits.find((item) => item.id === id);
  if (!foundedfruits) {
    return res.status(404).json({
      massage: "not found",
    });
  }
  fruits.forEach((item) => {
    if (item.id === id) {
      item.name = name ? name : item.name;
    }
  });
  write_file("fruits.json", fruits);
  res.status(201).json({
    massage: "yangilandi",
  });
});

app.delete("/fruits/:id", (req, res) => {
  const { id } = req.params;
  const fruits = read_file("fruits.json");
  const foundedfruits = fruits.find((item) => item.id === id);
  if (!foundedfruits) {
    return res.status(404).json({
      massage: "not found",
    });
  }
  fruits.forEach((item, index) => {
    if (item.id === id) {
      fruits.splice(index, 1);
    }
  });
  write_file("fruits.json", fruits);
  res.status(201).json({
    massage: "Ochirildi",
  });
});

app.get("/drinks", (req, res) => {
  res.status(200).send(read_file("drinks.json"));
});

app.post("/drinks", (req, res) => {
  const { name } = req.body;
  let drinks = read_file("drinks.json");
  if (name) {
    drinks.push({
      id: uuid.v4(),
      name,
    });
    write_file("drinks.json", drinks);
    return res.status(201).send({
      massage: "yaratildi",
    });
  }

  return res.status(400).send({
    massage: "name kiritilmagan",
  });
});

app.get("/drinks/:id", (req, res) => {
  const { id } = req.params;
  const drinks = read_file("drinks.json");
  const foundedDrinks = drinks.find((item) => item.id === id);
  if (foundedDrinks) {
    return res.status(200).send(foundedDrinks);
  }
  return res.status(404).send({
    massage: "drinks not found",
  });
});

app.put("/drinks", (req, res) => {
  const { name, id } = req.body;
  const drinks = read_file("drinks.json");
  const foundedDrinks = drinks.find((item) => item.id === id);
  if (!foundedDrinks) {
    return res.status(404).json({
      massage: "not found",
    });
  }
  drinks.forEach((item) => {
    if (item.id === id) {
      item.name = name ? name : item.name;
    }
  });
  write_file("drinks.json", drinks);
  res.status(201).json({
    massage: "yangilandi",
  });
});

app.delete("/drinks/:id", (req, res) => {
  const { id } = req.params;
  const drinks = read_file("drinks.json");
  const foundedDrinks = drinks.find((item) => item.id === id);
  if (!foundedDrinks) {
    return res.status(404).json({
      massage: "not found",
    });
  }
  drinks.forEach((item, index) => {
    if (item.id === id) {
      drinks.splice(index, 1);
    }
  });
  write_file("drinks.json", drinks);
  res.status(201).json({
    massage: "Ochirildi",
  });
});

////////////////////////////////////////// animals
app.get("/animals", (req, res) => {
  res.status(200).send(read_file("animals.json"));
});

app.post("/animals", (req, res) => {
  const { name } = req.body;
  let animals = read_file("animals.json");
  if (name) {
    animals.push({
      id: uuid.v4(),
      name,
    });
    write_file("animals.json", animals);
    return res.status(201).send({
      massage: "yaratildi",
    });
  }

  return res.status(400).send({
    massage: "name kiritilmagan",
  });
});

app.get("/animals/:id", (req, res) => {
  const { id } = req.params;
  const animals = read_file("animals.json");
  const foundedanimals = animals.find((item) => item.id === id);
  if (foundedanimals) {
    return res.status(200).send(foundedanimals);
  }
  return res.status(404).send({
    massage: "animals not found",
  });
});

app.put("/animals", (req, res) => {
  const { name, id } = req.body;
  const animals = read_file("animals.json");
  const foundedanimals = animals.find((item) => item.id === id);
  if (!foundedanimals) {
    return res.status(404).json({
      massage: "not found",
    });
  }
  animals.forEach((item) => {
    if (item.id === id) {
      item.name = name ? name : item.name;
    }
  });
  write_file("animals.json", animals);
  res.status(201).json({
    massage: "yangilandi",
  });
});

app.delete("/animals/:id", (req, res) => {
  const { id } = req.params;
  const animals = read_file("animals.json");
  const foundedanimals = animals.find((item) => item.id === id);
  if (!foundedanimals) {
    return res.status(404).json({
      massage: "not found",
    });
  }
  animals.forEach((item, index) => {
    if (item.id === id) {
      animals.splice(index, 1);
    }
  });
  write_file("animals.json", animals);
  res.status(201).json({
    massage: "Ochirildi",
  });
});

app.listen(PORT, () => {
  console.log("backent ishladi " + PORT + " Portda");
});
