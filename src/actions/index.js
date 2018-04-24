import socketIOClient from 'socket.io-client'

const DATA_URL = "https://api.bitfinex.com/v2/candles/trade:1m:tBTCUSD/hist?limit=100";
export const GET_DATA ='GET_DATA';
export const LIVE_DATA = 'LIVE_DATA';
const parseData= arr => arr.reverse().map((i)=>([i[0],i[1],i[3],i[4],i[2],i[5]]))

export const getData = () => dispatch =>{
   fetch(DATA_URL).then(res => res.json())
                  .then(data => dispatch({
                    type:GET_DATA,
                    payload:parseData(data)
                  }
))
}
export const getLive = () => dispatch => {
  var checkTime=0;
 const socket = socketIOClient('http://localhost:3001');
       socket.on("candle",(res)=>{
            if(checkTime <= res[0]){
               checkTime = res[0];
               dispatch({
                 type:LIVE_DATA,
                 payload:res
               })
             }
          })
}
