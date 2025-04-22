import express from 'express';

const PORT = 12346;
const app = express();

export function postResult(req, res){
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

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(sortedResults));
  } else {
    res.status(400).send('Invalid vote data');
  }
}

app.post('/', express.json(), postResult);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
