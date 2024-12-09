const express = require('express');
const apiRouter = express.Router();
const {
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase
} = require('./db.js');
const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');

apiRouter.get('/minions', (req, res, next) => {
  const minions = getAllFromDatabase('minions');
  res.send(minions);
});

apiRouter.post('/minions', (req, res, next) => {
  const newMinion = req.body;
  if(!newMinion) {
    res.status(404);
  } 
  const createdMenion = addToDatabase('minions', newMinion);
  res.send(createdMenion);
});

apiRouter.get('/minions/:minionId', (req, res, next) => {
  const minion = getFromDatabaseById('minions', req.params.minionId);
  if(!minion) {
    res.status(404).send();
  }
  res.send(minion);
});

apiRouter.put('/minions/:minionId', (req, res, next) => {
  const minion = req.body;
  const updatedMinion = updateInstanceInDatabase('minions', minion);
  if(!updateInstanceInDatabase) {
    res.status(404).send();
  }
  res.send(updatedMinion);
});

apiRouter.delete('/minions/:minionId', (req, res, next) => {
  if(deleteFromDatabasebyId('minions', req.params.minionId)) {
    res.status(202).send()
  } else {
    res.status(404).send();
  }
});

///////

apiRouter.get('/ideas', (req, res, next) => {
  const ideas = getAllFromDatabase('ideas');
  res.send(ideas); 
});

apiRouter.post('/ideas', (req, res, next) => {
  const newPost = req.query;
  if(checkMillionDollarIdea(newPost)) {
    const createdPost = addToDatabase('ideas', newPost);
    if(createdPost) {
      res.send(createdPost);
    } else {
      res.status(404).send();
    }
  } else {res.status(404).send();}
});

apiRouter.get('/ideas/:ideaId', (req, res, next) => {
  const idea = getFromDatabaseById('ideas', req.params.ideaId);
  if(!idea) {
    res.status(404).send();
  } 
  res.send(idea);
});

apiRouter.put('/ideas/:ideaId', (req, res, next) => {
  const updatedIdea = updateInstanceInDatabase('ideas', req.body);
  if(!updateInstanceInDatabase || !checkMillionDollarIdea(updatedIdea)) {
    res.status(404).send();
  }
  res.send(updatedIdea);
});

apiRouter.delete('/ideas/:ideaId', (req, res, next) => {
  if(deleteFromDatabasebyId('ideas', req.params.ideaId)) {
    res.status(202).send()
  } else {
    res.status(404).send();
  }
});

//////////

apiRouter.get('/meetings', (req, res, next) => {
  const meetings = getAllFromDatabase('meetings');
  if(!meetings) {
    res.status(404).send();
  }
  res.send(meetings);
});

apiRouter.post('/meetings', (req, res, next) => {
  const newMeeting = createMeeting();
  if(!newMeeting) {
    res.status(404).send();
  }
  res.send(newMeeting);
});

apiRouter.delete('/meetings', (req, res, next) => {
  if(!deleteAllFromDatabase('meetings')) {
    res.status(404).send();
  }
  res.status(200).send();
});

module.exports = apiRouter;
