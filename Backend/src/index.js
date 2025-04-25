import express from 'express';
import path from 'path';
import fs from 'fs';
import {v4 as uuidv4} from 'uuid';
import { Console } from 'console';
import { get } from 'http';
import { fetch } from 'undici';

let configpath;

if (process.env.CONFIG_PATH) {
    configpath = process.env.CONFIG_PATH;
} else {
    configpath = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.config");
}

const surveypath = path.join(configpath, 'surveys');

const PORT = 12345;
const SURVEY_EVALUATION = "http://surveyevaluation:12346";

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
    const temp = {...survey};
    temp.votes = undefined;
    res.send(JSON.stringify(temp));
  } else {
    res.status(404).send('Survey not found');
  }
}

export function putSurveyId(req, res){
  const survey = surveys.find(survey => survey.id === req.params.id);
  if (survey) {
    if (req.body.name) {
      survey.name = req.body.name;
    }

    if (req.body.date) {
      survey.date = req.body.date;
    }

    if (req.body.status) {
      survey.status = req.body.status;
    }

    if (req.body.songs) {
      let same = true;
      // Check if songs are actually different
      if (survey.songs.length != req.body.songs.length) {
        same = false;
      } 

      for (let song of survey.songs) {
        const found = req.body.songs.find(s => s.name === song.name);
       
        if (!found) {
          same = false;
          break;
        }
      }

      if (!same) {
        survey.songs = req.body.songs;
        survey.votes = [];
      }
    }

    fs.writeFileSync
    (path.join(surveypath, survey.id + '.json'), JSON.stringify(survey));
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

export async function getResultId(req, res){
  const survey = surveys.find(survey => survey.id === req.params.id);
  if (survey){
    if (!survey.votes) {
      res.status(400).send('No votes found');
      return;
    }

    try{
      const response = await fetch(SURVEY_EVALUATION, {
        method: 'POST',
        body: JSON.stringify({votes: survey.votes}),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if(!response.ok){
        throw new Error('Network response was not ok');
      }
      const data = await response.json();	
      res.send(JSON.stringify(data));
    }
    catch (error) {
      console.error('Error fetching survey evaluation:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  else{
    res.status(404).send('Survey not found');
  }
}

export function postVote(req, res){
  const vote = req.body;

  if (!vote.survey || !vote.songs) {
    return res.status(400).send('Invalid vote data');
  }

  const survey = surveys.find(survey => survey.id === vote.survey);
  if (survey) {
    if (survey.status === 'open') {
      vote.id = uuidv4();
      vote.survey = undefined;

      if (!survey.votes) {
        survey.votes = [];
      }

      survey.votes.push(vote);
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

    next();
});

app.get('/survey', getSurvey);

app.get('/survey/:id', getSurveyId);

app.post('/survey', express.json(), postSurvey);

app.put('/survey/:id', express.json(), putSurveyId);

app.delete('/survey/:id', deleteSurveyId);

app.get('/result/:id', getResultId);

app.post('/vote', express.json(), postVote);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
