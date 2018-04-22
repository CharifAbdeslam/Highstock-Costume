var app = require('express')();
var server = require('http').createServer(app);
const ws = require('ws')
var io = require('socket.io')(server);
const w = new ws('wss://api.bitfinex.com/ws/2')

w.on('message', (msg) =>{
  res = JSON.parse(msg)
  if(res[1] !=='hb'){
      io.emit('candle',res[1])
  }
})
let req = JSON.stringify({
   event: "subscribe",
   channel: "candles",
   key: "trade:1m:tBTCUSD"
})
w.on('open', () => w.send(req))
io.on('connect',function(){
  console.log("user connected")
})


server.listen(3001);
console.log("Server up and running")
