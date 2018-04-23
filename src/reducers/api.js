import {GET_DATA} from '../actions/index';
import {LIVE_DATA} from '../actions/index';
const INITIAL_STATE = {all:[],live:[]}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_DATA:
      return Object.assign({},state,{all:action.payload})
    case LIVE_DATA:
    return Object.assign({},state,{live:action.payload})
    default:
     return state;
  }
}
