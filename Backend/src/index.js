import express from 'express';
import path from 'path';
import fs from 'fs';
import {v4 as uuidv4} from 'uuid';
import { Console } from 'console';
import { get } from 'http';

const configpath = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.config");
const surveypath = path.join(configpath, 'surveys');

const PORT = 12345;

const app = express();

const surveys = [];

fs.mkdirSync(surveypath, { recursive: true });
const dir = fs.opendirSync(surveypath);
let dirent = dir.readSync();
while (dirent) {
  const data = JSON.parse(fs.readFileSync(path.join(surveypath, dirent.name), 'utf8'));
  surveys.push(data);
  dirent = dir.readSync();
}
dir.closeSync();

export function postSurvey(req, res) {
  const survey = req.body;
  survey.id = uuidv4();
  survey.votes = [];
  surveys.push(survey);
  fs.writeFileSync
  (path.join(surveypath, survey.id + '.json'), JSON.stringify(survey));
  res.send(survey.id);
}

export function getSurvey(req, res) {
  const result = [];
  for (const survey of surveys) {
    const temp = {...survey};
    temp.votes = undefined;
    result.push(temp);
  }
  res.send(JSON.stringify(result));
}

export function getSurveyId(req, res){
  const survey = surveys.find(survey => survey.id === req.params.id);
  if (survey) {
    survey.votes = undefined;
    res.send(JSON.stringify(survey));
  } else {
    res.status(404).send('Survey not found');
  }
}

export function putSurveyId(req, res){
  const survey = surveys.find(survey => survey.id === req.params.id);
  if (survey) {
    survey.name = req.body.name;
    survey.date = req.body.date;
    survey.status = req.body.status;
    survey.songs = req.body.songs;
    fs.writeFileSync
    (path.join(surveypath, survey.id + '.json'), JSON.stringify(survey));
    survey.votes = undefined;
    res.send(JSON.stringify(survey));
  } else {
    res.status(404).send('Survey not found');
  }
}

export function deleteSurveyId(req, res){
  const index = surveys.findIndex(survey => survey.id === req.params.id);
  if (index !== -1) {
    fs.unlinkSync(path.join
    (surveypath, surveys[index].id + '.json'));
    surveys.splice(index, 1);
    res.status(204).send();
  }
  else {
    res.status(404).send('Survey not found');
  }
}

export function getResultId(req, res){
  const survey = surveys.find(survey => survey.id === req.params.id);
  const priorityCount = {};
  if (survey) {
    for(const vote of survey.votes){
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
    res.status(404).send('Survey not found');
  }
}

export function postVote(res, req){
  const survey = surveys.find(survey => survey.id === req.body.survey);
  if (survey) {
    if (survey.status === 'open') {
      survey.votes.push(req.body.vote);
      fs.writeFileSync
      (path.join(surveypath, survey.id + '.json'), JSON.stringify(survey));
      res.status(204).send();
    }
    else{
      res.status(403).send('Survey is closed');
    }
  } else {
    res.status(404).send('Survey not found');
  }
}

app.use(function(req, res, next) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    // Set content type
    res.setHeader('Content-Type', 'application/json');
    next();
});

app.get('/survey', getSurvey);

app.get('/survey/:id', getSurveyId);

app.post('/survey', express.json(), postSurvey);

app.put('/survey/:id', express.json(), putSurveyId);

app.delete('/survey/:id', deleteSurveyId);

app.get('/result/:id', getResultId);

app.post('/vote', express.json(), postVote);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
