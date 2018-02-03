'use strict';
const lorem = require('lorem-ipsum');

const Card = require('./card.model');
const User = require('../auth/user.model');
const BASE_ADMIN = require('../auth/user.seed').data;

async function prepareData() {
    const staticData = {};
    const user = await User.findOne({email: BASE_ADMIN.email});
    const data = [];

    for(let i = 0; i < 5; i++) {
        let dataTmp = {};
        const randomComments = Math.floor(Math.random()*10);
        const randomPriority = Math.floor(Math.random()*100);

        dataTmp.title = lorem({count: 1, units: 'sentences', format: 'plain'});
        dataTmp.desc = lorem({count: 4, units: 'sentences', format: 'plain', paragraphLowerBound: 2})
        dataTmp.estimate = Math.floor(Math.random()*100);
        dataTmp.cardType = "Card",
        dataTmp.reporter = user;

        if(randomComments > 0) dataTmp.comments = [];

        for(let j = 0; j < randomComments; j++) {
            dataTmp.comments.push({
                comment: lorem({count: 2, units: 'sentences', format: 'plain', paragraphLowerBound: 2}),
                creationDate: new Date(),
                author: user
            });
        }

        data.push(dataTmp);
    }


    return data;
}

module.exports = {
    Model: Card,
    data: prepareData()
};