import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getData} from '../actions/index';
import {Container} from 'reactstrap';
import Highcharts from 'highcharts/highstock';
import StockChart from './Stock.jsx';
import socketIOClient from 'socket.io-client'
require('highcharts/indicators/indicators')(Highcharts)
require('highcharts/indicators/ema')(Highcharts)

class App extends Component {
  componentWillMount() {
    this.props.getData();

  }
  render() {
    var checkTime=0;
    var updated=[]
   const socket = socketIOClient('http://localhost:3001');
         socket.on("candle",function(res){
               if(checkTime < res[0] ){
                 checkTime = res[0];
                 updated.push({x:res[0],low:res[1],open:res[2],close:res[3],high:res[4],volume:res[5]})
               }
         })
    var liveChart = this.props.data;
    let volume = liveChart.map(i => ([
      i[0], i[5]
    ]));
    var stockOptions = {
      chart: {
        height: 600
      },
      events: {
           load: function () {

               // set up the updating of the chart each second
               var series = this.series[0];
               setInterval(function () {
               }, 1000);
           }
       },
      xAxis: {
        gridLineWidth: 1,
        lineWidth: 2
      },
      yAxis: [
        {

          height: '80%',
          labels: {
            align: 'left',
            x: -3
          }
        }, {
          top: '80%',
          height: '10%',
          labels: {
            align: 'left',
            x: -3
          },
          offset: 0
        }, {
          top: '90%',
          height: '10%',
          labels: {
            align: 'left',
            x: -3
          },
          offset: 0
        }
      ],
      series: [

        {
          type: 'candlestick',
          data: liveChart,
          name: 'ETH/BTC',
          id: 'aapl'
        }, {
          type: 'ema',
          marker: {
            enabled: false
          },
          linkedTo: 'aapl',
          params: {
            period: 50
          }
        }, {
          type: 'ema',
          linkedTo: 'aapl',
          marker: {
            enabled: false
          }
        }, {
          type: 'column',
          name: 'Volume',
          data: volume,
          yAxis: 1
        }, {
          type: 'area',
          name: 'Line',
          data: liveChart,
          yAxis: 2,
          threshold: null,
          tooltip: {
            valueDecimals: 2
          }
        }
      ]
    }

      stockOptions.series["data"] = updated;
      console.log(stockOptions.series["data"])
    return (<Container fluid={true}>
      <StockChart options={stockOptions} highcharts={Highcharts}/>
      <button>Click</button>
    </Container>);
  }
}
const mapStateToProps = state => ({data: state.candle.all})
export default connect(mapStateToProps, {getData})(App);
