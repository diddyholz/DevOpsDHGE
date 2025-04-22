import express from 'express';
import path from 'path';
import fs from 'fs';
import {v4 as uuidv4} from 'uuid';
import { Console } from 'console';

const configpath = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.config");
const surveypath = path.join(configpath, 'surveys');

const PORT = 12346;

const app = express();

// SERVER CODE HERE

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


export function getResult(req, res){
  const priorityCount = {};
  if (req.body.votes) {
    for(const vote of req.body.votes){
      for(const song of vote.songs){
        if(!priorityCount[song.id]){
          priorityCount[song.id] = 0;
        }
        if(song.priority === 0){
          priorityCount[song.id]++;
        }
      }
    }
    const sortedResults = Object.entries(priorityCount)
    .sort((a, b) => b[1] - a[1])
    .map(([id], index) => ({ song: id, place: index }));

    const result = { result: sortedResults };

    res.send(JSON.stringify(result));
  } else {
    res.status(400).send('Invalid vote data');
  }
}

app.get('/', getResult);