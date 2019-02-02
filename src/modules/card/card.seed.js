'use strict';
const lorem = require('lorem-ipsum');

const Board = require('../board/board.model');
const Card = require('./card.model');
const User = require('../auth/user.model');

const boardData = require('../board/board.seed').data;
const BASE_ADMIN = require('../auth/user.seed').data;
const {
  EPIC,
  STORY,
  TASK
} = require('./cardTypes.constants');

async function prepareData() {
  const user = await User.findOne({email: BASE_ADMIN.email});
  const boardObj = await boardData;
  const board = await Board.findOne({ name: boardObj.name });
  const data = [];
  const cardTypes = [EPIC, STORY, TASK];

  let cardData, comments;
  let i, j;

  for(i = 0; i < 5; i++) {
    cardData = {};
    comments = Math.floor(Math.random()*10);

    cardData.title = lorem({count: 1, units: 'sentences', format: 'plain'});
    cardData.desc = lorem({count: 4, units: 'sentences', format: 'plain', paragraphLowerBound: 2});
    cardData.estimate = Math.floor(Math.random()*100);
    cardData.cardType = cardTypes[Math.floor(Math.random()*cardTypes.length)],
    cardData.reporter = user;
    cardData.priority = Math.floor(Math.random()*100);
    cardData.board = board;

    if(comments > 0) cardData.comments = [];

    for(j = 0; j < comments; j++) {
      cardData.comments.push({
        comment: lorem({count: 2, units: 'sentences', format: 'plain', paragraphLowerBound: 2}),
        creationDate: new Date(),
        author: user
      });
    }

    data.push(cardData);
  }


  return data;
}

module.exports = {
  Model: Card,
  data: prepareData()
};
