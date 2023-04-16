import {useState, useEffect} from "react";
import {DataGrid} from "@mui/x-data-grid";
import {FormControl, InputLabel, Select} from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
import {SemiTitle} from "../../components/Title";
import {useCollection} from "../../hooks/useCollection";
import { getFunctions, httpsCallable } from "firebase/functions";
import { db } from "../../firebase/config";
import {collection, deleteDoc, doc, getDoc, setDoc} from "firebase/firestore";

export default function ApproveUsers() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [perPage, setPerPage] = useState(10);
    const [users, setUsers] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const { docs: allUsers } = useCollection('PendingUsers')

    useEffect(() => {
        const createUsers = allUsers && allUsers.map(userDoc => ({
            id: userDoc.id,
            email: userDoc.email,
            name: userDoc.name,
        }));
        setUsers(createUsers);
    }, [allUsers]);

    const handleApproveClick = () => {
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
            //     reservations: {}
            // })
            //
            // // if the user exists in ConfirmedUsers - delete this user from the Pending collection
            // await deleteDoc(doc(collection(db, 'ConfirmedUsers'), email));
            // updateUser(users[row - 1].id,users[row - 1].rule)
        })
    };

    const handleDenyClick = () => {
        selectedRows.forEach(async (row) => {
            const email = users[row - 1].email
            const userType = users[row - 1].userType

            console.log("email", email)
            console.log("userType", userType)

            // remove the user from the PendingUsers collection and notify the user
            // TODO - send the user mail that he was denied
            try {
                await deleteDoc(doc(collection(db, 'PendingUsers'), email));
                console.log('Document deleted successfully from PendingUsers');
            } catch (err) {
                console.error('Error deleting document:', err);
            }

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
        const {value} = event.target;
        console.log("value", value)
        const updatedUsers = [...users];
        console.log("value2", value)
        const rowIndex = updatedUsers.findIndex((u) => u.id === row.id);
        console.log("rowIndex", rowIndex)
        updatedUsers[rowIndex] = {...updatedUsers[rowIndex], userType: value};
        console.log("updatedUsers", updatedUsers)
        setUsers(updatedUsers);
    };

    const columns = [
        {field: 'id', headerName: 'ID', width: 90},
        {field: 'name', headerName: 'Name', width: 130},
        {field: 'email', headerName: 'Email', width: 200},
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
                disableSelectionOnClick
                onSelectionModelChange={handleSelectionChange}
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

