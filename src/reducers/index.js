import { combineReducers } from 'redux';
import liveChart from './api';
const reducers = combineReducers({
candle:liveChart,
});
export default reducers;
