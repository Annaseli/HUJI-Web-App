// whenever firebase recieves a request with a valid token, he sees that that user is being logged 
// (authenticated) and we can use that user object in the front app so we can use the data on the
// user object. For that we'll store the user object in kind of global state when the user is logged in
// - react context.

import { createContext, useReducer } from 'react'

export const AuthContext = createContext()

// A function that is responsible for updating our state
export const authReducer = (state, action) => {
    switch (action.type) {
        //TODO back: add cases
        case 'LOGIN':
            return { ...state, user: action.payload}
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    // using this hook to allow us to use an authReducer function to control the state. When we want
    // to update the state using this function, we dispatch an action and that will update the state.
    // When we'll have custom hooks to control signing up and out, login in and out then we can use 
    // the dispatch function inside those hooks directly to update our context value.
    const [state, dispatch] = useReducer(authReducer, {user: null})
    console.log('AuthContext state:', state)

    dispatch({ type: 'LOG_IN'})
    //TODO back: add all the rest

    return (
        // the children will be the entire app so the entire app will be surrounded by 
        // our AuthContextProvider
        <AuthContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
    )
}
