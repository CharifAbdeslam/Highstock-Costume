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
      updated:[]
    }
  }
  componentWillMount() {
    this.props.getData();
    var checkTime=0;
    var updated=[]
   const socket = socketIOClient('http://localhost:3001');
         socket.on("candle",(res)=>{
              if(checkTime <= res[0]){
                 checkTime = res[0];
                 updated.push([res[0],res[1],res[3],res[4],res[2],res[5]])
               }
               this.setState({updated})
         })
  }

  render() {
    var liveChart = this.props.data;
    var stockOptions = {
      chart: {
        height: 600
      }, events: {
            load: function () {
                setInterval(function () {
                },1000);
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
          data: liveChart.concat(this.state.updated),
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
          data: (()=>{
              return liveChart.concat(this.state.updated).map(i => ([
                 i[0], i[5]
               ]));
          })(),
          yAxis: 1
        }, {
          type: 'area',
          name: 'Line',
          data: liveChart.concat(this.state.updated),
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
      <button>Click</button>
    </Container>);
  }
}
const mapStateToProps = state => ({data: state.candle.all})
export default connect(mapStateToProps, {getData})(App);
