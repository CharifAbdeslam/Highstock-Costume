import socketIOClient from 'socket.io-client'

const DATA_URL = "https://api.bitfinex.com/v2/candles/trade:1m:tBTCUSD/hist?limit=50";
export const GET_DATA = 'GET_DATA';
const parseData = arr => arr.reverse().map((i) => ([
  i[0],
  i[1],
  i[3],
  i[4],
  i[2],
  i[5]
]))
const socket = socketIOClient('http://localhost:3001');
export const getData = () => dispatch => {
  fetch(DATA_URL).then(res => res.json()).then(data => {
    var newData = parseData(data)
    newData.pop();
    var checkTime = 0;
    var live = []
    socket.on("candle", (res) => {
      if (checkTime <= res[0]) {
        checkTime = res[0];

        live.push([
          res[0],
          res[1],
          res[3],
          res[4],
          res[2],
          res[5]
        ])
      }
      dispatch({type: GET_DATA, payload: newData.concat(live)})
    })
setInterval(()=>newData.shift(),60000);
  })
}
