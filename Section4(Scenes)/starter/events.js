'use strict';

const EventEmitter = require('events');
const http = require('http');

class Sales extends EventEmitter{
    constructor(){
        super();
    }
};

//const myEmitter = new EventEmitter();
const myEmitter = new Sales();

myEmitter.on('newSale', () =>{
    console.log('there is new sale');
});

myEmitter.on('newSale', () => {
    console.log('Costumer');
})

myEmitter.on('newSale', stock => {
    console.log(`there are now ${stock} items`);
})

myEmitter.emit('newSale', 9);

/////////////////////////////////////////

const server = http.createServer();
server.on('request', (req, res) => {
    console.log("Request received");
    res.end('Request received');
});
server.on('request', (req, res) => {
    res.end('anothe Request received');
});

server.on('close', () => {
    console.log('Close server');
});

server.listen(3000, '127.0.0.1', () =>{
    console.log('Waiting for requests...');
})