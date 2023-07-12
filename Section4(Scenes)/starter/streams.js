'use strict';

const fs = require('fs');
const server = require('http').createServer();
server.on('request', (req, res) => {
    //solution1
    // fs.readFile('test-file.txt', (err, data) => {
    //     if(err) console.log(err);
    //     res.end(data);
    // });

    //solution2: streams
    // const readable = fs.createReadStream("test-file.txt");
    // readable.on('data', chunk =>{
    //     res.write(chunk);
    // });
    // readable.on('end', () =>{
    //     res.end();
    // });
    // readable.on('error', err =>{
    //     console.log(err);
    //     res.end('File not found');
    // })
    /*
    backpressure happens when the response cannot send the 
    data as fast as it is receiving it from the file
    */

    //solution3
    const readable = fs.createReadStream("test-file.txt");
    readable.pipe(res);
    //readableSourse.pipe(writeableDest)



});
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening ... ');
});