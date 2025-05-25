const { promisify } = require('util')
const fs = require('fs')

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

exports.getDb = async () => {
  let back = await readFile('./db.json', 'utf-8');
  return JSON.parse(back)
}

exports.saveDb = async (data) => {
  return await writeFile('./db.json', JSON.stringify(data))
}