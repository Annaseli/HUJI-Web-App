import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FormControl, InputLabel, Select } from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";

// components & custom hooks
import { SemiTitle } from "../../components/Title";
import { useCollection } from "../../hooks/useCollection";

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
        // let counter = 0;
        setIsPending(true)
        const createUsers = allUsers && allUsers.map(userDoc => ({
            // id: counter++,
                id: userDoc.id,
            email: userDoc.email,
            name: userDoc.name,
        }
        ));
        setUsers(createUsers);
        if(!isCancelled) {
            setIsPending(false)
        }
        return () => setIsCancelled(true)
    }, [allUsers]);

    const handleApproveClick = () => {
        setError(null)
        setIsPending(true)
        console.log(selectedRows)
        // todo add try catch and if (!isCancelled)
        selectedRows.forEach(async (row) => {
            const email = users[row - 1].email
            const userType = users[row - 1].userType
            const name = users[row - 1].name
            const uid = users[row - 1].uid

            console.log(email)
            console.log(userType)
            console.log(name)
            console.log(uid)

            // enable the user from Authentication
            // TODO: after deploy do this:
            // const functions = getFunctions();
            // const enableDisableUser = httpsCallable(functions, 'enableDisableUser');
            // try {
            //     const result = await enableDisableUser({ uid: user.uid, disable: false })
            //     console.log(result.data); // 'Successfully updated user'
            // } catch(error) {
            //     console.log('Error updating user:', error);
            //     setError(error.message)
            // }

            // // add the user to "Users" collection
            // await setDoc(doc(collection(db, 'Users') , uid), {
            //     userType,
            //     email,
            //     name: displayName,
            //     userReservations: {}
            // })
            //
            // // if the user exists in ConfirmedUsers - delete this user from the Pending collection
            // await deleteDoc(doc(collection(db, 'ConfirmedUsers'), email));
            // updateUser(users[row - 1].id,users[row - 1].rule)
        })
    };

    const handleDenyClick = () => {
        setError(null)
        setIsPending(true)
        // todo add try catch and if (!iscancelled)
        selectedRows.forEach(async (row) => {
            const email = users[row - 1].email
            const userType = users[row - 1].userType

            console.log("email", email)
            console.log("userType", userType)

            // remove the user from the PendingUsers collection and notify the user
            // try {
            //     await deleteDoc(doc(collection(db, 'PendingUsers'), email));
            //     console.log('Document deleted successfully from PendingUsers');
            // } catch (err) {
            //     console.error('Error deleting document:', err);
            // }\

            // delete the user from firebase authentication
            // TODO: after deploy do this:
            // const functions = getFunctions();
            // const deleteUser = httpsCallable(functions, 'deleteUser');
            // try {
            //     const result = await deleteUser({ uid: user.uid })
            //     console.log(result.data); // 'Successfully deleted user'
            // } catch(error) {
            //     console.log('Error deleting user:', error);
            //     setError(error.message)
            // }
        })
    }

    const handleSelectionChange = (newSelection) => {
        console.log(newSelection)
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
        {field: "name", headerName: "Name", width: 130},
        {field: "email", headerName: "Email", width: 200},
        {
            field: 'userType',
            headerName: 'User Type',
            width: 150,
            renderCell: (params) => {
                const {row} = params;
                return (
                    <FormControl fullWidth>
                        <InputLabel id={`userType-select-label-${row.id}`}>User Type</InputLabel>
                        <Select
                            labelId={`userType-select-label-${row.id}`}
                            value={row.userType || ''}
                            onChange={(event) => handleUserTypeChange(event, row)}
                        >
                            <MenuItem value="User">User</MenuItem>
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
                // disableSelectionOnClick
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
            {isPending && <p>loading...</p>}
            {error && <p>{error}</p>}
        </div>
    );
}

