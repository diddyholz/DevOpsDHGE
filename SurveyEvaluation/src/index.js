import express from 'express';
import path from 'path';
import fs from 'fs';
import {v4 as uuidv4} from 'uuid';
import { Console } from 'console';

const configpath = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.config");
const surveypath = path.join(configpath, 'surveys');

const PORT = 12345;

const app = express();

// SERVER CODE HERE

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
