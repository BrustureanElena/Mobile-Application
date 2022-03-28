export const ToggleOnline = (dispatch) => {
    return (online) => {
        dispatch({
            type:'SET_ONLINE',
            payload: online
        })
    }
}
