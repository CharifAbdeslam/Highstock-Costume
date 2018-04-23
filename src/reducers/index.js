import { combineReducers } from 'redux';
import all from './api';
import live from './api';
const reducers = combineReducers({
candle:all,
livedata:live
});
export default reducers;
