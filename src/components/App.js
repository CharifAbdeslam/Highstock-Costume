import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getData} from '../actions/index';
import {Container} from 'reactstrap';
import ReactHighstock from 'react-highcharts/ReactHighstock';
require('highcharts/indicators/indicators')(Highcharts)
require('highcharts/indicators/pivot-points')(Highcharts)
require('highcharts/indicators/macd')(Highcharts)
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/map')(Highcharts)
class App extends Component {
  componentWillMount() {
    this.props.getData()
  }
/*https://github.com/highcharts/highcharts-react/blob/master/package.json*/
  render() {
    const {data} = this.props;
    var ohlc = [],
      volume = [],
      dataLen = data.length;
    let i = 0;
    for (i; i < dataLen; i += 1) {
      ohlc.push([data[i][0], // the date
        data[i][1], // open
        data[i][3], // high
        data[i][4], // low
        data[i][2] // close
      ]);
      volume.push([data[i][0], // the date
        data[i][5] // the volume
      ]);
    }
    const config = {
      rangeSelector: {
        buttons: [
          {
            type: 'hour',
            count: 1,
            text: '1h'
          }
        ],
        selected: 1,
        inputEnabled: false
      },
      title: {
        text: 'AAPL Historical'
      },
      yAxis: [
        {
          height: '80%',
          lineWidth: 2,
          resize: {
            enabled: false
          }
        }, {
          top: '70%',
          height: '20%',
          offset: 0,
          lineWidth: 2
        }
      ],

      tooltip: {
        split: true
      },
      chart:{
             height:600
     },
      series: [
        {
          type: 'candlestick',
          name: 'AAPL',
          data: ohlc,
          id:'aapl'
        }, {
          type: 'column',
          name: 'Volume',
          data: volume,
          yAxis: 1
        }
      ]

    }
    return (<Container fluid={true}>
      <ReactHighstock config={config}/>
    </Container>);
  }
}
const mapStateToProps = state => ({data: state.candle.all})
export default connect(mapStateToProps, {getData})(App);
