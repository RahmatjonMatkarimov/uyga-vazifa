const http = require("http");
const { read_file, write_file } = require("./utils/file_managment");
const uuid = require("uuid");

const app = http.createServer((req, res) => {
  const headers = {
    "content-type": "application/json",
    "access-control-allow-origin": "*",
  };

  const reqId = req.url.split("/")[2];

  //medicine
  if (req.method === "GET" && req.url === "/medicine") {
    const data = read_file("medicine.json");
    res.writeHead(200, headers);
    res.end(JSON.stringify(data));
  }

  if (req.method === "POST" && req.url === "/medicine") {
    req.on("data", (chunk) => {
      const reqData = JSON.parse(chunk);
      reqData.id = uuid.v4();
      const data = read_file("medicine.json");
      data.push(reqData);
      write_file("medicine.json", data);
    });

    res.writeHead(201, headers);
    res.end(
      JSON.stringify({
        massage: "yaratildi",
      })
    );
  }

  if (req.method === "GET" && req.url === "/medicine/" + reqId) {
    const data = read_file("medicine.json");
    const findData = data.find((item) => item.id === reqId);
    res.writeHead(200, headers);
    res.end(JSON.stringify(findData));
  }

  if (req.method === "PUT" && req.url === "/medicine/" + reqId) {
    req.on("data", (chunk) => {
      const medicine = read_file("medicine.json");
      const { name } = JSON.parse(chunk);
      const findmedicine = medicine.find((item) => item.id === reqId);
      if (findmedicine) {
        for (let i = 0; i < medicine.length; i++) {
          const item = medicine[i];
          if (item.id === reqId) {
            medicine[i].name = name ? name : medicine[i].name;
          }
        }
        write_file("medicine.json", medicine);
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

  if (req.method === "DELETE" && req.url === "/medicine/" + reqId) {
    const data = read_file("medicine.json");
    let result = [];
    const findmedicine = data.find((item) => item.id === reqId);
    if (findmedicine) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id !== reqId) {
          result.push(data[i]);
        }
      }
      write_file("medicine.json", result);
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

  if (req.method === "POST" && req.url === "/register") {
    req.on("data", (chunk) => {
      const data = read_file("auth.json");
      const { username, password } = JSON.parse(chunk);
      let isUser = false;
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (item.username === username) {
          isUser = true;
        }
      }

      if (!isUser) {
        data.push({
          username,
          password: btoa(password),
          id: uuid.v4(),
        });
        write_file("auth.json", data);
        res.writeHead(201, headers);
        return res.end(
          JSON.stringify({
            massage: "yaratildi",
          })
        );
      }
      {
        res.writeHead(409, headers);
        return res.end(
          JSON.stringify({
            massage: "bu foydalanuvchi nomi allaqachion bor",
          })
        );
      }
    });
  }

  if (req.method === "POST" && req.url === "/login") {
    req.on("data", (chunk) => {
      let { username, password } = JSON.parse(chunk);
      const users = read_file("auth.json");

      if (!username || !password) {
        res.writeHead(400, headers);
        return res.end(
          JSON.stringify({
            massage: "username yoki password kiritilmagan",
          })
        );
      }

      let foundedUser = users.find((item) => item.username === username);
      if (!foundedUser) {
        res.writeHead(404, headers);
        return res.end(
          JSON.stringify({
            massage: "user topilmadi",
          })
        );
      }

      if (atob(foundedUser.password) !== password) {
        res.writeHead(400, headers);
        return res.end(
          JSON.stringify({
            massage: "Parol notogri",
          })
        );
      }

      res.writeHead(201, headers);
      return res.end(
        JSON.stringify({
          massage: "hammasi joyida",
          token: btoa(username),
        })
      );
    });
  }
});

app.listen(3000, () => {
  console.log("backent ishladi");
});
