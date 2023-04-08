import { useReducer, useEffect, useState } from "react";
import { addDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

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
        case 'UPDATED_DOC':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'ERROR':
            return { isPending: false, document: null, success: false, error: action.payload }
        case 'DELETED_DOC':
            return { isPending: false, document: null, success: true, error: null }
        default:
            return state
    }
}

export const useFirestore = () => {
    // response from firestore and dispatch for dispatching new actions to the reducer function
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    // only dispatch if not cancelled
    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action)
        }
    }

    // add a document
    const addDocToFireStore = async (ref, data) => {
        dispatch({ type: 'IS_PENDING' })

        try {
            //const createdAt = timestamp.fromDate(new Date())
            const addedDoc = await addDoc(ref, data)
            dispatchIfNotCancelled({ type: 'ADDED_DOC', payload: addedDoc })
        }
        catch (error) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: error.message })
        }
    }

    // set a document
    const setDocToFireStore = async (ref, data, settings) => {
        dispatch({ type: 'IS_PENDING' })

        try {
            //const createdAt = timestamp.fromDate(new Date())
            const addedDoc = await setDoc(ref, data, settings)
            dispatchIfNotCancelled({ type: 'ADDED_DOC', payload: addedDoc })
        }
        catch (error) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: error.message })
        }
    }

    // update a document
    const updateDocInFireStore = async (ref, data) => {
        dispatch({ type: 'IS_PENDING' })

        try {
            const updateedDoc = await updateDoc(ref, data)
            dispatchIfNotCancelled({ type: 'UPDATED_DOC', payload: updateedDoc })
        }
        catch (error) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: error.message })
        }
    }

    // delete a document
    const deleteDocInFireStore = async (ref) => {
        dispatch({ type: 'DELETED_DOC' })

        try {
            await deleteDoc(ref)
            dispatchIfNotCancelled({ type: 'DELETED_DOC' })

        }
        catch(error) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: error.message })
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { addDocToFireStore, setDocToFireStore, updateDocInFireStore, deleteDocInFireStore, response }
}
