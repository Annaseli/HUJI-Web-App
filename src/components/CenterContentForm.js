import { useEffect, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";

// firebase imports
import { db } from "../firebase/config";
import { collection } from "firebase/firestore";

export default function CenterContentForm() {
    const [contentType, setContentType] = useState('')
    const [content, setContent] = useState('')
    const { addDocToFireStore, response } = useFirestore()
    console.log("Center Content Form")

    const handleSubmit = async (event) => {
        event.preventDefault()

        const ref = collection(db, 'CenterContent')       
        await addDocToFireStore(ref, {
            // do I need to check that content is a text value?
            contentType,
            content
        })     
    }

    // without the useEffect the component renders infinitely 
    useEffect(() => {
        if (response.success) {
            setContentType('')
            setContent('')
        } else if (response.error) {
            setContentType('')
            setContent('')
            console.log(response.error)
        } else if (response.isPending) {
            console.log("loading...")
            // can I print the loading to the user too?
        }   
    }, [response.success, response.error])
    
    // give only 2 options for content type: messages or description
    return(
        <>
            <h2>Center Content Form</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span> Content Type:</span>
                    <input
                        required
                        type="text"
                        onChange={(e) => setContentType(e.target.value)}
                        value={contentType}
                    />
                </label>
                <label>
                    <span> Content:</span>
                    <input
                        required
                        type="text"
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                    />
                </label>
                <button>Add content</button>
            </form>
            </>       
    )
}