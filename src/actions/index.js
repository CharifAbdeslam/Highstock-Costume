const DATA_URL = "https://api.bitfinex.com/v2/candles/trade:1m:tBTCUSD/hist";
export const GET_DATA ='GET_DATA';

const arrange =array=>{
 return array.map(([x,open,close,high,low,volume]) =>{
    return ({x,open,close,high,low,volume })
  })

}

export const getData = () => dispatch =>{
   fetch(DATA_URL).then(res => res.json())
                   .then(data => dispatch({type:GET_DATA,payload:arrange(data)}))
}
