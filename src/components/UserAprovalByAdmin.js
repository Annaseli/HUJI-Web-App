import { useEffect } from "react"
import { db } from "../firebase/config";
import { getAuth, deleteUser, updateUser, getUser } from "firebase/auth";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";


// TODO - back: the user enable, getUser and delete user doesn't work.
export default function UserAprovalByAdmin() {
    // parse email
    let email;
    let userType;
    let resMapFromCurDay = {}

    const auth = getAuth();
    const user = auth.currentUser;
    // const user = getUser(auth, 'h@mail.com')
    // .then((user) => {
    //   console.log('Success');
    // })
    // .catch((error) => {
    //   console.error(error);
    // });


    // if aproved:
    // enable account
    // add the user to Users:    

    // useEffect(() => {
    //     async function fetchData() {
    //         const ref = collection(db, 'Users') 
    //         await setDoc(doc(ref, email), {
    //             userType,
    //             resMapFromCurDay
    //         })
    
    //         try {
    //             await auth.updateUser(user.uid, {disabled: false})
    //             console.log("user enabled successfuly")
    //         } catch (error) {
    //             console.log("an error in enabling the user", error.message)
    //         }
    //     }
    //     fetchData();
    //   }, []);
    
    // if didn't aprove:
    // delete account

    console.log(user)
    useEffect(() => {
        async function fetchData() {
            try {
                await deleteUser(user)
                console.log("user deleted successfuly")
            } catch (error) {
                console.log("an error in deleting the user", error.message)
            }
        }
        fetchData();
    }, []) 
}



