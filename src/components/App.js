import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getData} from '../actions/index';
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
  componentDidMount() {
    this.props.getData();
  }

  render() {
    const {data} = this.props
    var stockOptions = {
      rangeSelector : {
               selected : 0
             },
      chart: {
        height: 600
      },
      xAxis: {
        gridLineWidth: 1,
        lineWidth: 2
      },
      yAxis: [

        {
          lineWidth: 1,
          height: '85%',
          labels: {
            align: 'left',
          },

        }, {
          lineWidth: 1,
          height: '85%',
          gridLineWidth: 0,
          offset: 0,
          labels: {
            enabled: false
          }

        }, {
          lineWidth: 1,
          top: '85%',
          height: '15%',
          labels: {
            enabled: false
          },
          offset: 0
        }, {
          lineWidth: 1,
          top: '85%',
          height: '15%',
          labels: {
            enabled: false
          },
          offset: 0
        }
      ],
      tooltip: {
        backgroundColor: 'white',
        borderWidth: 0,
        borderRadius: 0,
        headerFormat: '{point.key}',
        pointFormat: ' | <span style="color:{series.color}">{series.name}: </span>{point.y} {point.z}',
        positioner: function () {
            return { x: 10, y: 35 };
        },
        shadow: false,
        split: false,
        shared:true,
        crosshairs: [true,true],
    },
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
            period: 10
          }
        }, {
          type: 'ema',
          linkedTo: 'aapl',
          marker: {
            enabled: false
          }
        }, {
          type: 'wma',
          linkedTo: 'aapl',
          params: {
            period: 10
          },
          marker: {
            enabled: false
          }
        }, {
          color:'#CCCCCC',
          type: 'column',
          name: 'Volume',
          zIndex: -1,
          data: (() => {
            return data.map(i => ([
              i[0], i[5]
            ]));
          })(),
          yAxis: 1
        }, {
          type: 'area',
          data: data,
          name:'Area',
          yAxis: 2,
          threshold: null,
          tooltip: {
            valueDecimals: 2
          }
        }, {
          type: 'bb',
          linkedTo: 'aapl'
        }, {
          yAxis: 3,
          type: 'rsi',
          linkedTo: 'aapl',
          marker: {
            enabled: false
          }
        }, {
          yAxis: 1,
          type: 'stochastic',
          linkedTo: 'aapl',
          params: {
            period: 10
          },
        }
      ]

    }
if (!data) {
  return(<div>Loading</div>)
}
    return (<Container fluid={true}>
      <StockChart options={stockOptions} highcharts={Highcharts}/>
      <button>Click</button>
    </Container>);
  }
}

const mapStateToProps = state => ({data: state.candle.all})
export default connect(mapStateToProps, {getData})(App);
