const DATA_URL = "https://api.bitfinex.com/v2/candles/trade:1m:tETHBTC/hist";
export const GET_DATA ='GET_DATA';
const parseData= arr => arr.reverse().map((i)=>([i[0],i[1],i[3],i[4],i[2],i[5]]))

export const getData = () => dispatch =>{
   fetch(DATA_URL).then(res => res.json())
                  .then(data => dispatch({
                    type:GET_DATA,
                    payload:parseData(data)
                  }
))
}
