import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getData,getLive} from '../actions/index';
import {Container} from 'reactstrap';
import Highcharts from 'highcharts/highstock';
import StockChart from './Stock.jsx';
require('highcharts/indicators/indicators')(Highcharts);
require('highcharts/indicators/ema')(Highcharts);

class App extends Component {
  componentWillMount() {
    this.props.getData();
    this.props.getLive();
  }

  render() {
    var liveChart = this.props.data;
    var stockOptions = {
      chart: {
        height: 600
      }, events: {
            load: function () {
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
          data: liveChart.concat(this.props.live),
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
              return liveChart.concat(this.props.live).map(i => ([
                 i[0], i[5]
               ]));
          })(),
          yAxis: 1
        }, {
          type: 'area',
          name: 'Line',
          data: liveChart.concat(this.props.live),
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

const mapStateToProps = state => ({
  data: state.candle.all,
  live: state.livedata.live
})
export default connect(mapStateToProps, {getData,getLive})(App);
