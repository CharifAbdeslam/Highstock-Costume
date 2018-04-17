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
              }, {
                  type: 'day',
                  count: 1,
                  text: '1D'
              }, {
                  type: 'all',
                  count: 1,
                  text: 'All'
              }],
              selected: 0,
              inputEnabled: false
          },
      title: {
        text: 'BTC/USD 1mn'
      },
      series: [
        {
          title:'price',
          type: 'candlestick',
          data: this.props.data.reverse(),
        }
      ]
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
