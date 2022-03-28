//stateul de aici contine doar connectivity care are attributul isOnline

                                                //by default attribute
export default function (state = {isOnline: false}, action) {
    switch (action.type){
        case 'SET_ONLINE':
            return {...state, isOnline: action.payload}
        default:
            return state
    }
}