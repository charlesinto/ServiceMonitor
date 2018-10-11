import express from 'express';
import socket from 'socket.io';
import bodyParser from 'body-parser';
import http from 'http';
import path from 'path';
import service from './route/service';

require('dotenv').config();

const apiVersion = express.Router();
const app = express();
app.use(express.static(path.join(__dirname, 'UI')));
app.use(express.static('UI'));
app.use('/', service);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = socket().listen(server);
io.on('connection', (sc) =>{
    console.log(`user connected, id: ${sc.id}`);
   
});

server.listen(port, () => { console.log(`server is listening on port ${port}`)});

export default server;
