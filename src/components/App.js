import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getData,getLive} from '../actions/index';
import {Container} from 'reactstrap';
import Highcharts from 'highcharts/highstock';
import StockChart from './Stock.jsx';
require('highcharts/indicators/indicators')(Highcharts);
require('highcharts/indicators/ema')(Highcharts);
require('highcharts/indicators/bollinger-bands')(Highcharts);
require('highcharts/indicators/rsi')(Highcharts);
require('highcharts/indicators/stochastic')(Highcharts);
require('highcharts/indicators/wma')(Highcharts);

class App extends Component {

  componentWillMount() {
    const {getData,getLive} = this.props
    getData();
    getLive();
  }

  render() {
    const {data,live} = this.props
    var updated=[]
    updated.push([live[0],live[1],live[3],live[4],live[2],live[5]])
    var stockOptions = {
      chart: {
        height: 600
      }, events: {
            load:  () =>{
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
          height: '80%',
          gridLineWidth: 0,
          lineWidth: 0,
          offset: 0,
          labels: {
       enabled: false
   }
        }, {
          top: '80%',
          height: '20%',
          labels: {
         enabled: false
       },
          offset: 0,

        },
        {
          top: '98%',
          height: '20%',
          labels: {
         enabled: false
       },
          offset: 0,

        }
      ],
      series: [

        {
          type: 'candlestick',
          data:data.concat(updated),
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
        },
        {
           type: 'wma',
           linkedTo: 'aapl',
           params: {
               period: 50
           },
           marker: {
             enabled: false
           },
       }, {
          type: 'column',
          name: 'Volume',
          data: (()=>{
              return data.concat(updated).map(i => ([
                 i[0], i[5]
               ]));
          })(),
          yAxis: 1
        }, {
          type: 'area',
          data: data.concat(updated),
          yAxis: 2,
          threshold: null,
          tooltip: {
            valueDecimals: 2
          }
        },
        {
          type: 'bb',
          linkedTo: 'aapl'
          },
          {
           yAxis: 3,
           type: 'rsi',
           linkedTo: 'aapl',
           marker: {
             enabled: false
           },
       },
       {
        yAxis: 1,
        type: 'stochastic',
        linkedTo: 'aapl'
        }
      ]
    }

    return (<Container fluid={true}>
      <StockChart options={stockOptions} highcharts={Highcharts} ref="chart"/>
      <button>Click</button>
    </Container>);
  }
}

const mapStateToProps = state => ({
  data: state.candle.all,
  live: state.candle.live
})
export default connect(mapStateToProps, {getData,getLive})(App);
