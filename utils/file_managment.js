const fs = require("fs");

const read_file = (name) => {
  return JSON.parse(fs.readFileSync("./module/" + name, "utf-8"));
};

const write_file = (name, data) => {
  return fs.writeFileSync("./module/" + name, JSON.stringify(data,null,4));
};
module.exports = {
    read_file,
    write_file
}

