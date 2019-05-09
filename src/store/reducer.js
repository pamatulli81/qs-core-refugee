const initialState = {
    toggle: true,
    map: false
}

const reducer = (state=initialState, action) => {
    if(action.type === 'TOGGLE'){
        return{
            toggle:  !state.toggle,
            map: state.map
        }
    }
    if(action.type === 'MAP'){
       return { 
           map: !state.map
       }
    }
    return state;
}

export default reducer;