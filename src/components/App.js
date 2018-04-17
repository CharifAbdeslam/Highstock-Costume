import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getData} from '../actions/index'
import ReactHighstock from 'react-highcharts/ReactHighstock';

class App extends Component {

  componentWillMount() {
       this.props.getData()
  }

  render() {
    const config= {
      rangeSelector: {
              buttons: [{
                  type: 'hour',
                  count: 1,
                  text: '1h'
              }],
              selected: 0,
              inputEnabled: false
          },
          plotOptions: {
 candlestick: {
            color: 'red',
            upColor: 'green'
        }
    },
    yAxis: [{
            labels: {
                align: 'right',
                x: -3
            },
            height: '80%',
            lineWidth: 2,
            resize: {
                enabled: true
            }
        }, {
            labels: {
                align: 'right',
                x: -3
            },
            top: '80%',
            height: '20%',
            offset: 0,
            lineWidth: 2
        }],
      title: {
        text: 'BTC/USD 1mn'
      },
      chart:{
        height:500
      },
      series: [
        {
          title:'price',
          type: 'candlestick',
          id:'crypto',
          data: this.props.data.reverse()
        }]
      }

    if(this.props.data == null){
      return(<div>Loading ...</div>)
    }
    return (<div className="container text-center">
      <ReactHighstock config={config}/>
    </div>);
  }
}
const mapStateToProps = state =>({
  data : state.candle.all
})
export default connect(mapStateToProps,{getData})(App);
