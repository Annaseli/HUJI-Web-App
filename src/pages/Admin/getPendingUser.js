import {useCollection} from "../../hooks/useCollection";

export default function getPendingUser() {
    let users = []
    const { docs: usersDocs } = useCollection('PendingUsers')
    console.log("usersDocs", usersDocs)
    usersDocs && usersDocs.forEach((userDoc) => {
        users.push({
            "id": userDoc.uid,
            "email": userDoc.email,
            "name": userDoc.displayName
        })
    })
    return users;
    }