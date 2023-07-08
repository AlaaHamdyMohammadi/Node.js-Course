'use strict';

const fs = require('fs');
const { text } = require('node:stream/consumers');
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}. \n Created on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);

// console.log(textIn);
// console.log(textOut);