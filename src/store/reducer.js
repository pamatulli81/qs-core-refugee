import {ACTION_TOGGLE, ACTION_MAP} from "../constants";

const initialState = {
    toggle: true,
    map: false
}

const reducer = (state=initialState, action) => {
    if(action.type === ACTION_TOGGLE){
        return{
            toggle:  !state.toggle,
            map: state.map
        }
    }
    if(action.type === ACTION_MAP){
       return { 
           map: !state.map
       }
    }
    return state;
}

export default reducer;