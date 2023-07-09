'use strict';

const fs = require('fs');
const http = require('http');
// const path = require('path');
const url = require('url');
// dot = current location of this module
const replaceTemplate =  require('./modules/replaceTemplate')

////////////////////////////////////
//Files

/*
// Blocking, synchronus way
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}. \n Created on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);
// console.log(textIn);
// console.log(textOut);
*/

/*
// Non-Blocking, Asynchronus way
fs.readFile('./txt/startttt.txt', 'utf-8', (err, data1) => {
    if(err) return console.log('Error ⛔');
    console.log(data1);
    fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
        console.log(data2);
        fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
            console.log(data3);
            
            fs.writeFile('./txt/final.txt', `${data2} \n ${data3}` , 'utf-8', err => {
                console.log('Your file has been written 🎉');
            })
        });
    });
});
console.log('Will read file !'); // executed before line 18
*/


////////////////////////////////////
//Server

const replaceTamplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCT_NAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if(!product.organic){
        output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
    }
    return output;
}


//Converted to block code in the top level to execute only once
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const data =  fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const {query, pathname} = url.parse(req.url, true);
    //console.log(req.url);
    //console.log(url.parse(req.url, true));

    //Overview page
    if(pathname === '/' || pathname === '/overview'){
      res.writeHead(200, { "Content-type": "text/html" });

      const cardsHtml = dataObj.map((el) => replaceTamplate(tempCard, el)).join('');
      //console.log(cardsHtml);

      const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
      res.end(output);
    
    //Product page
    }else if(pathname === '/product'){
         res.writeHead(200, { "Content-type": "text/html" });
         const product = dataObj[query.id];
         const output = replaceTamplate(tempProduct, product);
         res.end(output);
    //API    
    }else if(pathname === '/api'){
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(data);
    //Not found    
    }else{
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        })
        res.end("<h1>Page not found !</h1>");
    }
});

server.listen(8000, '127.0.0.1', () =>{
    console.log('Listening to request on port 8000')
});

////////////////////////////////////
