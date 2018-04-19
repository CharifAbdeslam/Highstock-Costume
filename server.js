var app = require('express')();
var server = require('http').createServer(app);
const ws = require('ws')
var io = require('socket.io')(server);
const w = new ws('wss://api.bitfinex.com/ws/2')
let data=[];
w.on('message', (msg) =>{
  data.push(JSON.parse(msg))
w.emit('candle',data)
})
let req = JSON.stringify({
   event: "subscribe",
   channel: "candles",
   key: "trade:1m:tBTCUSD"
})
w.on('open', () => w.send(req))



server.listen(3001);
console.log("Server up and running")
