import axios from "axios";

const initialState = {
    email: null, 
    firstName: null,
    lastName: null
}

const REQUEST_USER_DATA = 'REQUEST_USER_DATA'

export function requestUserData(){
    let user = axios.get('/auth/user-data').then(res => res.data)
    return {
        type: REQUEST_USER_DATA,
        payload: user
    }
}

function userReducer(state = initialState, action) {
    let {type,payload} = action
    switch (type) {
        case REQUEST_USER_DATA + '_FULFILLED':
            const {email, firstName, lastName} = payload.user
            return {
                email,
                firstName,
                lastName
            }
        default:
            return state
    }
}


export default userReducer