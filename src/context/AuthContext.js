// whenever firebase recieves a request with a valid token, he sees that that user is being logged 
// (authenticated) and we can use that user object in the front app so we can use the data on the
// user object. For that we'll store the user object in kind of global state when the user is logged in
// - react context.

import { createContext, useEffect, useReducer } from 'react'
import { projectAuth } from '../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'

export const AuthContext = createContext()

// A function that is responsible for updating our state - mirroring what firebase is doing
export const authReducer = (state, action) => {
    switch (action.type) {
        // When firebase signs in user for example, we update our global auth state so we can 
        // have that user as well
        case 'LOGIN':
            return { ...state, user: action.payload }
        // When firebase logs out user, we update our global auth state so the user becomes null
        case 'LOGOUT':
            return { ...state, user: null }
        case 'AUTH_IS_READY':
            return { user: action.payload, authIsReady: true }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    // using this hook to allow us to use an authReducer function to control the state. When we want
    // to update the state using this function, we dispatch an action and that will update the state.
    // When we'll have custom hooks to control signing up and out, login in and out then we can use 
    // the dispatch function inside those hooks directly to update our context value.
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false
    })

    useEffect(() => {
        // Will communicate with firebase - it will let the function know when there is a change in
        // authentication status and then fire the func inside that inside her we take the user.
        // It will be fired once - only when we first connect to firebase.
        const unsub = onAuthStateChanged(projectAuth, user => {
            dispatch( { type: 'AUTH_IS_READY', payload: user })
            // unsubscribe from firing each time there is an auth state change
            unsub()
        })
    }, [])

    console.log('AuthContext state:', state)

    //dispatch({ type: 'LOG_IN'})
    //TODO back: add all the rest

    return (
        // the children will be the entire app so the entire app will be surrounded by 
        // our AuthContextProvider
        <AuthContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
    )
}
