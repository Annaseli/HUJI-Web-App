import { useEffect } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { useCollection } from "../hooks/useCollection"

// firebase imports
import { db } from "../firebase/config";
import { doc } from "firebase/firestore";

export default function DisplayDelAllUsers() {
    console.log("Display Del All Users")
    const { docs: allUsers } = useCollection('Users')

    //const [allUsers, setAllUsers] = useState([])
    // //TODO: add a cleanup function
    // useEffect(() => {
    //     async function fetchData() {            
    //         const querySnap = await getDocs(collection(db, "Users"))
    //         querySnap.forEach((d) => {
    //             const id = d.id  
    //             setAllUsers(prevState => [...prevState, id])                          
    //         })                             
    //     }
    //     fetchData();    
    // }, []) 
      
    const { deleteDocInFireStore, response } = useFirestore()

    const handleSubmitDelete = async (event) => {
        event.preventDefault()
        const uid = event.target.id
          
        // TODO: back - delete account from authentiocation 
        
        // delete the user from Users
        const docRef = doc(db, "Users", uid);
        await deleteDocInFireStore(docRef)               
    }

    // without the useEffect the component renders infinitely 
    useEffect(() => {
        if (response.success) {
            console.log(response.success)
        } else if (response.error) {
            console.log(response.error)
        } else if (response.isPending) {
            console.log("loading...")
            // can I print the loading to the user too?
        }   
    }, [response.success, response.error])

    if (allUsers) {
        console.log("allUsers", allUsers)
    }
    return (
        <>
        <h2>Display Del All Users</h2>
            {allUsers && (allUsers).map(user => (
                <div key={user.id}>
                    {user.id}
                    <form onSubmit={handleSubmitDelete} id={user.id}>                       
                        <button>Delete User</button>
                    </form>
                </div>
            ))}
        </>
    )   
}