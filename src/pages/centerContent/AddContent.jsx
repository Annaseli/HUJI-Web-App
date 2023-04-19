import {useEffect, useState} from "react";
import {useFirestore} from "../../hooks/useFirestore";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../../firebase/config";
import useGetCenterContent from "../../hooks/useGetCenterContent";

// TODO - front: create a form that adds or edits the aboutUS paragraph to the db.
export default function AddContent(contentType) {
    console.log("AddContent")
    const { addDocToFireStore, response } = useFirestore()
    const { curContent, error } = useGetCenterContent(contentType)

    const [newContent, setContent] = useState('ggju')

    const handleSubmit = async (event) => {
        event.preventDefault()
        await addDocToFireStore(collection(db, 'CenterContent'), {
            contentType,
            content: newContent
        })
    }

    // curContent is an array
    return(
        <div>
            <h2>Add {contentType}</h2>
        </div>
    )
}