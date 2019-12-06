const http = require('http');
const path = require("path");
const spawn = require('child_process').spawn;
const express = require('express')
const app = express()

var server = http.Server(app);

// Serv Client
app.get('/client-test', (req, res) => {
    res.sendFile(__dirname + '/client-test.html');
})

// Serv 3d generator
app.get('/3d-generator', (req, res) => {
    res.sendFile(__dirname + '/3d-generator/display.html');
})
app.get('/scripts/app.js',function(req,res){
    res.sendFile(path.join(__dirname + '/3d-generator/scripts/app.js')); 
});
app.get('/scripts/geometry.js',function(req,res){
    res.sendFile(path.join(__dirname + '/3d-generator/scripts/geometry.js')); 
});
app.get('/models/shop.glb',function(req,res){
    res.sendFile(path.join(__dirname + '/3d-generator/models/shop.glb')); 
});
app.get('/models/building2.glb',function(req,res){
    res.sendFile(path.join(__dirname + '/3d-generator/models/building2.glb')); 
});


var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {

    console.log('1 - Un client est connecté !');

    socket.on('geolocDatas', function (datas) {

        console.log('2 - GeoDatas reçus ');
    
        geoDatas = [datas.lat, datas.lng];
        
        socket.broadcast.emit('predict', geoDatas.toString());
        console.log('3 - Lancement du ml');
    });
    
    socket.on('predictFinished', function (datas) {
        console.log(datas.toString());
        console.log('4 - Envois au js');
        socket.broadcast.emit('generateWorld', datas.toString());
    });

    socket.on('imgBase64', function (img) {
        console.log('5 - Js terminé reception de l\'image');
        socket.broadcast.emit('imgBase64', img);
    });

});

server.listen(8080, () => {
    console.log('Express lancé')
})