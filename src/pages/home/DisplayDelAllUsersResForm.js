import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useCollection } from "../../hooks/useCollection"
import GetUsersRes from "../../components/GetUsersRes";
import DisplayDelUsersResForm from "./DisplayDelUsersResForm";

// firebase imports
import { db } from "../../firebase/config";
import { collection, getCountFromServer, deleteDoc, doc, setDoc, deleteField , updateDoc, query, where, getDocs, getDoc  } from "firebase/firestore";

export default function DisplayDelAllUsersResForm() {
    //const [allUid, setAllUid] = useState(new Set())
    const [allUid, setAllUid] = useState([])
    const [count, setCount] = useState()

    useEffect(() => {
        async function fetchData() {
            const colRef = collection(db, "Users");
            const docsSnap = await getDocs(colRef);
            docsSnap.forEach(doc => {
                console.log("doc.id",doc.id);
                //setAllUid(prevState => new Set([...prevState, doc.id])); 
                setAllUid(prevState => [...prevState, doc.id]); 
            })
            const snapshot = await getCountFromServer(colRef);
            console.log('count: ', snapshot.data().count);
            setCount(snapshot.data().count)
        }
        fetchData()
    }, [])

    console.log("allUid", allUid)

    return(
        <>
            <h2>DisplayDelAllUsersResForm</h2>
            {/* <h1>{allUid}</h1> */}
            {/* {(allUid) && allUid.forEach((uid) => {
                <>
                <h1>{uid}</h1>
                {/* <DisplayDelUsersResForm uid={uid} displayCheckIn={false} /> 
                </>
            */}
            {allUid.map(uid => (
                <div key={uid}>
                    {uid}
                    <DisplayDelUsersResForm uid={uid} displayCheckIn={false} /> 
                </div>
            ))}
        </>        
    )
    
}

