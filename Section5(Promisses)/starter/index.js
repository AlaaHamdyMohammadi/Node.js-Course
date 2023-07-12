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

//async/await return promise
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
        // console.log(err);
        //use throw in situations when async/await function need to return value 
        throw(err); //this entire promise as rejected(must use catch block to handle this error)
    }
    return '2: Reeeedy'
}

//using async/await to handle error
(async() => {
    try{
      console.log('1: Will get dog pics!');
      const test = await getDogPic(); //value of this promise = '2: Reeeedy'
      console.log(test);
      console.log('3: Done getting dog pics!');
    }catch(err){
        console.log('Errooooooooor');
    }
})();

/*
//using then to handle error
console.log('1: Will get dog pics!');
// const test = getDogPic();
// console.log(test);
getDogPic().then(test => { 
    console.log(test)
    console.log('3: Done getting dog pics!');
}).catch(err =>{
    console.log('Errooooooooor');
});
*/

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

