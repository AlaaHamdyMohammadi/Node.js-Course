'use strict';
const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) return reject('I could not find that file');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
    if (err) reject('Not Found the data');
    resolve('Success');
    });
  });
};

const getDogPic = async () =>{
    try{
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Bread : ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePro('dog-img.txt', res.body.message);
    console.log('Rondom image save to file');
    }catch(err){
        console.log(err);
    }
}
getDogPic();


/*
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Bread : ${data}`);

    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);

    return writeFilePro('dog-img.txt', res.body.message);
  })
  .then(() => {
    console.log('Rondom image save to file');
  })
  .catch((err) => {
    console.log(err);
  });
*/

