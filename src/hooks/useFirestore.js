import { useReducer, useEffect, useState } from "react";
import { db } from "../firebase/config";

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { isPending: true, document: null, success: false, error: null }
        case 'ADDED_DOC':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'ERROR':
            return { isPending: false, document: null, success: false, error: action.payload }
        default:
            return state
    }
}

export const useFirestore = (collection) => {
    // response from firestore and dispatch for dispatching new actions to the reducer function
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    // collection ref
    const ref = collection(collection)

    // only dispatch if not cancelled
    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action)
        }
    }

    // add a document
    const addDocument = async (doc) => {
        dispatch({ type: 'IS_PENDING' })

        try {
            //const createdAt = timestamp.fromDate(new Date())
            // will use createdAt to be able to order the docs when we retrieve them based on the timestamp
            const addedDoc = await ref.add({ ...doc })
            dispatchIfNotCancelled({ type: 'ADDED_DOC', payload: addedDoc })
        }
        catch (error) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: error.message })
        }
    }

    // delete a document
    const deleteDocument = async (id) => {

    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { addDocument, deleteDocument, response }
}