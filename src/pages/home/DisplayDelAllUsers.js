import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useCollection } from "../../hooks/useCollection"
import GetUsersRes from "../../components/GetUsersRes";

// firebase imports
import { db } from "../../firebase/config";
import { collection, getCountFromServer, deleteDoc, doc, setDoc, deleteField , updateDoc, query, where, getDocs, getDoc  } from "firebase/firestore";

export default function DisplayDelAllUsers() {
    const [allUsers, setAllUsers] = useState([])

    //TODO: add a cleanup function
    useEffect(() => {
        async function fetchData() {
            console.log("DisplayDelAllUsers")
            const querySnapshot = await getDocs(collection(db, "Users"))
            querySnapshot.forEach((d) => {
                const id = d.id
                console.log(id)  
                //setAllUsers([...allUsers, id])     
                setAllUsers(prevState => [...prevState, id])                          
            })   
                           
        }
        fetchData();    
        console.log("allUsers1", allUsers) 
    }, []) 

    const handleSubmitDelete = async (event) => {
        event.preventDefault()
        const uid = event.target.id
          
        // TODO: delete account from authentiocation 
        
        // delete the user from Users
        const docRef = doc(db, "Users", uid);
        try {
            await deleteDoc(docRef)
            console.log("Entire Document has been deleted successfully.")
        } catch(error) {
            console.log(error);
        }
                
    }

    console.log("allUsers2", allUsers)   
    return (
        <div>
        <h2>Display Del All Users</h2>
            {allUsers.map(uid => (
                <div key={uid}>
                    {uid}
                    <form onSubmit={handleSubmitDelete} id={uid}>                       
                        <button>Delete User</button>
                    </form>
                </div>
            ))}
        </div>
    )   
}