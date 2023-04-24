import {useEffect, useState} from "react";

// firebase
import {addDoc, collection} from "firebase/firestore";
import { db } from "../../firebase/config";

// custom hooks
import useGetCenterContent from "../../hooks/useGetCenterContent";

// TODO - front: create a form that adds or edits the aboutUS paragraph to the db.
//  Use the curContent for editing the prev context and the setContent for adding new content.
export default function AddContent(contentType) {
    console.log("AddContent")
    const { curContent, error, isPending } = useGetCenterContent(contentType)
    const [newContent, setContent] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        // todo - add try and catch
        await addDoc(collection(db, "CenterContent"), {
            contentType,
            content: newContent
        })
    }

    // curContent is an array
    return(
        <div>
            <h2>Add {contentType}</h2>
            {isPending && <p>loading...</p>}
            {error && <p>{error}</p>}
        </div>
    )
}