import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FormControl, InputLabel, Select } from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";

// components & custom hooks
import { SemiTitle } from "../../components/Title";
import { useCollection } from "../../hooks/useCollection";
import {collection, deleteDoc, doc, setDoc} from "firebase/firestore";
import {db} from "../../firebase/config";
import {getFunctions, httpsCallable} from "firebase/functions";

export default function ApproveUsers() {
    const [users, setUsers] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { docs: allUsers, error: err } = useCollection("PendingUsers")
    // if (!isCancelled) {
    //     setIsPending(false)
    //     if (err) {
    //         setError(err)
    //     }
    // }

    useEffect(() => {
        setIsPending(true)
        const createUsers = allUsers && allUsers.map((userDoc, index) => ({
            id: index + 1,
            uid: userDoc.uid,
            name: userDoc.displayName,
            email: userDoc.email
        }));
        setUsers(createUsers);
        if(!isCancelled) {
            setIsPending(false)
        }
        return () => setIsCancelled(true)
    }, [allUsers]);

    const handleApproveClick = () => {
        setError(null)
        setIsPending(true)
        // todo add try catch and if (!isCancelled)
        selectedRows.forEach(async (row) => {
            const email = users[row - 1].email
            const userType = users[row - 1].userType
            const name = users[row - 1].name
            const uid = users[row - 1].uid

            // remove the user from the PendingUsers collection
            try {
                await deleteDoc(doc(collection(db, "PendingUsers"), email));
                console.log("Document deleted successfully from PendingUsers");
            } catch (err) {
                console.error("Error deleting document:", err);
                setError(err.message || "unknown error occurred")
            }

            // add the user to "Users" collection
            await setDoc(doc(collection(db, "Users") , uid), {
                userType,
                email,
                name,
                userReservations: {}
            })

            // TODO: check why isn't working
            // enable the user from Authentication
            // const functions = getFunctions();
            // const enableDisableUser = httpsCallable(functions, 'enableDisableUser');
            // try {
            //     const result = await enableDisableUser({ uid: uid, disable: false })
            //     console.log("result.data", result.data); // 'Successfully updated user'
            // } catch(error) {
            //     console.log('Error updating user:', error);
            //     setError(error.message)
            // }

        })
    };

    const handleDenyClick = () => {
        setError(null)
        setIsPending(true)
        // todo add try catch and if (!iscancelled)
        selectedRows.forEach(async (row) => {
            const email = users[row - 1].email
            const uid = users[row - 1].uid

            // remove the user from the PendingUsers collection
            try {
                await deleteDoc(doc(collection(db, "PendingUsers"), email));
                console.log("Document deleted successfully from PendingUsers");
            } catch (err) {
                console.error("Error deleting document:", err);
                setError(err.message || "unknown error occurred")
            }

            // TODO: check why isn't working
            // delete the user from firebase authentication
            // const functions = getFunctions();
            // console.log("before try");
            // const deleteUser = httpsCallable(functions, "deleteUser");
            // try {
            //     console.log("after try");
            //     const result = await deleteUser({ uid: uid })
            //     console.log("result.data", result.data); // 'Successfully deleted user'
            // } catch(error) {
            //     console.log("Error deleting user:", error);
            //     setError(error.message)
            // }
        })
    }

    const handleSelectionChange = (newSelection) => {
        setSelectedRows(newSelection);
    };
    const handleUserTypeChange = (event, row) => {
        const { value } = event.target;
        const updatedUsers = [...users];
        const rowIndex = updatedUsers.findIndex((u) => u.id === row.id);
        updatedUsers[rowIndex] = {...updatedUsers[rowIndex], userType: value};
        setUsers(updatedUsers);
    };

    const columns = [
        {field: "id", headerName: "ID", width: 90},
        {field: "uid", headerName: "Uid", width: 200},
        {field: "name", headerName: "Name", width: 130},
        {field: "email", headerName: "Email", width: 200},
        {
            field: "userType",
            headerName: "User Type",
            width: 150,
            renderCell: (params) => {
                const {row} = params;
                return (
                    <FormControl fullWidth>
                        <InputLabel id={`userType-select-label-${row.id}`}>User Type</InputLabel>
                        <Select
                            labelId={`userType-select-label-${row.id}`}
                            value={row.userType || 'Member'}
                            // defaultValue={"Member"}
                            onChange={(event) => handleUserTypeChange(event, row)}
                        >
                            <MenuItem value="Member">Member</MenuItem>
                            <MenuItem value="Team">Team</MenuItem>
                            <MenuItem value="Admin">Admin</MenuItem>
                        </Select>
                    </FormControl>
                );
            },
        },
    ];

    return (
        users && <div style={{height: 400, width: '100%'}}>
            <SemiTitle>Approve New Users </SemiTitle>
            <DataGrid
                rows={users}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[10]}
                checkboxSelection
                disableSelectionOnClick
                onRowSelectionModelChange={handleSelectionChange}
            />
            <button
                onClick={handleApproveClick}
                disabled={selectedRows.length === 0}
                style={{
                    padding: '10px',
                    borderRadius: '5px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    cursor: selectedRows.length === 0 ? 'default' : 'pointer',
                    opacity: selectedRows.length === 0 ? 0.5 : 1,
                    marginRight: '10px'
                }}>
                Approve
            </button>
            <button
                onClick={handleDenyClick}
                disabled={selectedRows.length === 0}
                style={{
                    padding: '10px',
                    borderRadius: '5px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    cursor: selectedRows.length === 0 ? 'default' : 'pointer',
                    opacity: selectedRows.length === 0 ? 0.5 : 1
                }}
            >
                Deny
            </button>
        </div>
    );
}

