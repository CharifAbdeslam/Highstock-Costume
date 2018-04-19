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
constructor(props){
  super(props);
  this.state={
    data:[]
  }
}
  componentWillMount() {
   const socket = socketIOClient('http://localhost:3001');
         socket.on("candle",function(data){
               console.log(data)
         })
    this.props.getData()
  }
  render() {
    const {data} = this.props;
    let volume = data.map(i => ([
      i[0], i[5]
    ]));
    const stockOptions = {
      chart: {
        height: 600
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
          data: data,
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
          data: volume,
          yAxis: 2,
          threshold: null,
          tooltip: {
            valueDecimals: 2
          }
        }
      ]
    }
    return (<Container fluid={true}>
      <StockChart options={stockOptions} highcharts={Highcharts}/>
    </Container>);
  }
}
const mapStateToProps = state => ({data: state.candle.all})
export default connect(mapStateToProps, {getData})(App);
