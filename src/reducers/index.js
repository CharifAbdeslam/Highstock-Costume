import { combineReducers } from 'redux';
import all from './api';
const reducers = combineReducers({
candle:all
});
export default reducers;
