import express from 'express';
import path from 'path';
import fs from 'fs';
import {v4 as uuidv4} from 'uuid';
import { Console } from 'console';

const configpath = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.config");
const surveypath = path.join(configpath, 'surveys');

const PORT = 12345;

const app = express();

const surveys = [];
fs.mkdirSync(surveypath, { recursive: true });
const dir = fs.opendirSync(surveypath);
let dirent = dir.readSync();
while (dirent) {
  console.log(dirent.name);
  const data = JSON.parse(fs.readFileSync(path.join(surveypath, dirent.name), 'utf8'));
  surveys.push(data);
  dirent = dir.readSync();
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/survey', (req, res) => {
  
});
