import { combineReducers } from 'redux';
import dataCandles from './api';
const reducers = combineReducers({
candle:dataCandles
});
export default reducers;
