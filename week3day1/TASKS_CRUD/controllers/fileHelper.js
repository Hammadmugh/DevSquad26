const fs = require("fs/promises");
const path = require("path");
const filePath = path.join(__dirname, "../data/tasks.json");
async function readtasks() {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}
async function writetasks(tasks) {
  await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
}

module.exports = { readtasks, writetasks };
