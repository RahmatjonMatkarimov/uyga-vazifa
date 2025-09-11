const http = require("http");
const { read_file, write_file } = require("./utils/file_managment");
const uuid = require("uuid");

const app = http.createServer((req, res) => {
  const headers = {
    "content-type": "application/json",
    "access-control-allow-origin": "*",
  };

  const reqId = req.url.split("/")[2];

  //users
  if (req.method === "GET" && req.url === "/users") {
    const data = read_file("users.json");
    res.writeHead(200, headers);
    res.end(JSON.stringify(data));
  }

  if (req.method === "POST" && req.url === "/users") {
    req.on("data", (chunk) => {
      const reqData = JSON.parse(chunk);
      reqData.id = uuid.v4();
      const data = read_file("users.json");
      data.push(reqData);
      write_file("users.json", data);
    });

    res.writeHead(201, headers);
    res.end(
      JSON.stringify({
        massage: "yaratildi",
      })
    );
  }

  if (req.method === "GET" && req.url === "/users/" + reqId) {
    const data = read_file("users.json");
    const findData = data.find((item) => item.id === reqId);
    res.writeHead(200, headers);
    res.end(JSON.stringify(findData));
  }

  if (req.method === "PUT" && req.url === "/users/" + reqId) {
    req.on("data", (chunk) => {
      const users = read_file("users.json");
      const { name } = JSON.parse(chunk);
      const findUsers = users.find((item) => item.id === reqId);
      if (findUsers) {
        for (let i = 0; i < users.length; i++) {
          const item = users[i];
          if (item.id === reqId) {
            users[i].name = name ? name : users[i].name;
          }
        }
        write_file("users.json", users);
        res.writeHead(201, headers);
        return res.end(
          JSON.stringify({
            massage: "yangilandi",
          })
        );
      } else {
        res.writeHead(400, headers);
        res.end(
          JSON.stringify({
            massage: "user topilmadi",
          })
        );
      }
    });
  }

  if (req.method === "DELETE" && req.url === "/users/" + reqId) {
    const data = read_file("users.json");
    let result = [];
    const findUsers = data.find((item) => item.id === reqId);
    if (findUsers) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id !== reqId) {
          result.push(data[i]);
        }
      }
      write_file("users.json", result);
      res.writeHead(201, headers);
      return res.end(
        JSON.stringify({
          massage: "O'chirildi",
        })
      );
    } else {
      res.writeHead(400, headers);
      res.end(
        JSON.stringify({
          massage: "user topilmadi",
        })
      );
    }
  }
  

  //products
  if (req.method === "GET" && req.url === "/products") {
    const data = read_file("products.json");
    res.writeHead(200, headers);
    res.end(JSON.stringify(data));
  }

  if (req.method === "POST" && req.url === "/products") {
    req.on("data", (chunk) => {
      const reqData = JSON.parse(chunk);
      reqData.id = uuid.v4();
      const data = read_file("products.json");
      data.push(reqData);
      write_file("products.json", data);
    });

    res.writeHead(201, headers);
    res.end(
      JSON.stringify({
        massage: "yaratildi",
      })
    );
  }

  if (req.method === "GET" && req.url === "/products/" + reqId) {
    const data = read_file("products.json");
    const findData = data.find((item) => item.id === reqId);
    res.writeHead(200, headers);
    res.end(JSON.stringify(findData));
  }

  if (req.method === "PUT" && req.url === "/products/" + reqId) {
    req.on("data", (chunk) => {
      const products = read_file("products.json");
      const { name } = JSON.parse(chunk);
      const findproducts = products.find((item) => item.id === reqId);
      if (findproducts) {
        for (let i = 0; i < products.length; i++) {
          const item = products[i];
          if (item.id === reqId) {
            products[i].name = name ? name : products[i].name;
          }
        }
        write_file("products.json", products);
        res.writeHead(201, headers);
        return res.end(
          JSON.stringify({
            massage: "yangilandi",
          })
        );
      } else {
        res.writeHead(400, headers);
        res.end(
          JSON.stringify({
            massage: "user topilmadi",
          })
        );
      }
    });
  }

  if (req.method === "DELETE" && req.url === "/products/" + reqId) {
    const data = read_file("products.json");
    let result = [];
    const findproducts = data.find((item) => item.id === reqId);
    if (findproducts) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id !== reqId) {
          result.push(data[i]);
        }
      }
      write_file("products.json", result);
      res.writeHead(201, headers);
      return res.end(
        JSON.stringify({
          massage: "O'chirildi",
        })
      );
    } else {
      res.writeHead(400, headers);
      res.end(
        JSON.stringify({
          massage: "user topilmadi",
        })
      );
    }
  }
});

app.listen(3000, () => {
  console.log("backent ishladi");
});
