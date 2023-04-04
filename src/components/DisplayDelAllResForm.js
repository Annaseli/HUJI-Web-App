import { useColl } from "../hooks/useColl"
import DisplayDelResForm from "./DisplayDelResForm";

// firebase imports
import { db } from "../firebase/config";
import { collection, getCountFromServer, deleteDoc, doc, setDoc, deleteField , updateDoc, query, where, getDocs, getDoc  } from "firebase/firestore";

export default function DisplayDelAllResForm() {
    const { docs: allUsers } = useColl('Users')

    //const [allUid, setAllUid] = useState(new Set())
    //const [allUid, setAllUid] = useState([])
    //const [count, setCount] = useState()

    // useEffect(() => {
    //     async function fetchData() {
    //         const colRef = collection(db, "Users");
    //         const docsSnap = await getDocs(colRef);
    //         docsSnap.forEach(doc => {
    //             console.log("doc.id",doc.id);
    //             //setAllUid(prevState => new Set([...prevState, doc.id])); 
    //             setAllUid(prevState => [...prevState, doc.id]); 
    //         })
    //         const snapshot = await getCountFromServer(colRef);
    //         console.log('count: ', snapshot.data().count);
    //         setCount(snapshot.data().count)
    //     }
    //     fetchData()
    // }, [])

    return(
        <>
            <h2>DisplayDelAllResForm</h2>
            {allUsers && (allUsers).map(user => (
                <div key={user.id}>
                    {user.id}
                    <DisplayDelResForm uid={user.id} displayCheckIn={false} /> 
                </div>
            ))}
        </>        
    )
    
}

