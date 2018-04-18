const DATA_URL = "https://api.bitfinex.com/v2/candles/trade:5m:tBTCUSD/hist?limit=1000";
export const GET_DATA ='GET_DATA';

export const getData = () => dispatch =>{
   fetch(DATA_URL).then(res => res.json())
                  .then(data => dispatch({
                    type:GET_DATA,
                    payload:data.reverse()}
                  ))
}
