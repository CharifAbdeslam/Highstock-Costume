const DATA_URL = "https://api.bitfinex.com/v2/candles/trade:1m:tBTCUSD/hist?limit=1000";
export const GET_DATA ='GET_DATA';

const arrange = arr => {
    return arr.map(([x,open,close,high,low,volume]) =>({x,open,close,high,low,volume}))     
}

export const getData = () => dispatch =>{
   fetch(DATA_URL).then(res => res.json())
                   .then(data => dispatch({type:GET_DATA,payload:arrange(data)}))
}
