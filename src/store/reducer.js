const initialState = {
    toggle: true
}

const reducer = (state=initialState, action) => {
    if(action.type === 'TOGGLE'){
        return{
            toggle:  !state.toggle
        }
    }
    return state;
}

export default reducer;