import reclamatii from "../assets/reclamatii";

//REDUCERII
//A reducer is a function that receives the current state and an action object, decides how to update the state if necessary,
// and returns the new state: (state, action) => newState. You can think of a reducer as an event listener which handles events
// based on the received action (event) type.
//daca nu am nimic in state, o sa puna default reclamatii.js
export default function (state = reclamatii, action) {
    switch (action.type) {
        case 'UPDATE_RECLAMATIE':
            return state.map(
                    (content) => {
                        if (content.id === action.payload.id) {
                            //...content seteaza la restul fieldurilor , la cele care nu apar aici
                            //numa ce ii trimit ca parametru ii in action.payload
                            return {...content, ...action.payload}
                        }else{
                         return content}})
        case 'DELETE_RECLAMATIE':
            return state.filter((reclamatie) => action.payload !== reclamatie.id)
        case 'ADD_RECLAMATIE':
            return state.concat([action.payload])
        default:
            return state
    }
}