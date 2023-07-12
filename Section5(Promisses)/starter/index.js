'use strict';
const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Bread : ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(res.body.message);

      fs.writeFile('dog-img.txt', res.body.message, (err) => {
        console.log('Rondom image save to file');
      });
    }).catch(err => {
        console.log(err.message);
    })
});
