import { deleteUser } from "firebase/auth";
import { projectAuth } from "../../config";
import {useEffect} from "react";

export default function AllUsers(user) {
    console.log("user", user)
    useEffect(() => {
        async function deleteUser() {
            try {
                await deleteUser(user)
                console.log("success")
            }
            catch (error) {
                console.log("error", error.message)
            }
        }
        deleteUser()
    }, [])
}