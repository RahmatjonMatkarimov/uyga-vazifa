const fs = require("fs");

const read_file = (name) => {
  return JSON.parse(fs.readFileSync("./module/" + name + ".json", "utf-8"));
};

const write_file = (name, data) => {
  return fs.writeFileSync(
    "./module/" + name + ".json",
    JSON.stringify(data, null, 4)
  );
};
module.exports = {
  read_file,
  write_file,
};
