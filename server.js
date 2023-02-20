const express = require('express')
const path = require('path')
const http = require('http')
const Ws = require('ws').Server

const app = express()
app.use('/public',express.static(path.resolve(__dirname, './public/')))

const server = http.createServer(app)
server.listen(3000)

let wsServer = new Ws({ server })
wsServer.on('connection', socket => {
  socket.on('message', msg => {
    console.log('客户端发送过来的消息：' + msg);
    socket.send('服务器说：你好客户端')
  })
});