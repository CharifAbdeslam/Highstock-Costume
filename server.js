var app = require('express')();
var server = require('http').createServer(app);
const ws = require('ws')
var io = require('socket.io')(server);
const w = new ws('wss://api.bitfinex.com/ws/2')
let data=[];
w.on('message', (msg) =>{
  res = JSON.parse(msg)
  if(res[1] !=='hb'){
    data.push(res[1])
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
  setInterval(()=>{
    io.emit('candle',data)
  },1000)

})


server.listen(3001);
console.log("Server up and running")
