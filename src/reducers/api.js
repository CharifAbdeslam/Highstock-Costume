import {GET_DATA} from '../actions/index';
const INITIAL_STATE = {all:[]}

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
    case GET_DATA:
      return Object.assign({},state,{all:action.payload})
    default:
     return state;
  }
}
