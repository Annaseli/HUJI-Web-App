import {useState, useEffect} from "react";
import {DataGrid} from "@mui/x-data-grid";
import {FormControl, InputLabel, Select} from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
import {SemiTitle} from "../../components/Title";
import {useCollection} from "../../hooks/useCollection";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {db, projectAuth} from "../../firebase/config";
import {collection, deleteDoc, doc, setDoc} from "firebase/firestore";

// TODO - need the disable feature or to make him sign up again because it's unsafe to pass the password loke that
export default function ApproveUsers() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [perPage, setPerPage] = useState(10);
    //const [users, setUsers] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const users = []
    const { docs: usersDocs } = useCollection('PendingUsers')
    console.log("usersDocs", usersDocs)
    usersDocs.forEach((userDoc) => {
        users.push({
            "email": userDoc.email,
            "name": userDoc.displayName,
            "password": userDoc.password
        })
    })
    console.log("users", users)

    const handleApproveClick = async () => {
        selectedRows.forEach(async (row) => {
            const email = users[row - 1].email
            const userType = users[row - 1].userType
            const displayName = users[row - 1].displayName
            const password = users[row - 1].password

            console.log(email)
            console.log(userType)
            console.log(displayName)
            console.log(password)

            // sign the user up to firebase
            const res = await createUserWithEmailAndPassword(projectAuth, email, password)
            // if network connection is bad
            if (!res) {
                throw new Error('Could not complete SignUp')
            }

            const user = res.user
            console.log('user signed up after approval:', user)

            // add display name to user
            await updateProfile(projectAuth.currentUser, { displayName })

            // add user to the "Users" collection
            await setDoc(doc(collection(db, 'Users') , user.uid), {
                userType,
                email,
                resMapFromCurDay: {}
            })

            // remove user from the PendingUsers collection
            try {
                await deleteDoc(doc(collection(db, 'PendingUsers'), email));
                console.log('Document deleted successfully from ConfirmedUsers');
            } catch (err) {
                console.error('Error deleting document:', err);
            }
        })
        // updateUser(users[row - 1].id,users[row - 1].rule)
    };

    const handleDenyClick = async () => {
        selectedRows.forEach(async (row) => {
            console.log(users[row - 1].email)
            console.log(users[row - 1].userType)

            // romove the user from the PendingUsers collection and notify the user
            // TODO - send the user mail that he was denied

            try {
                await deleteDoc(doc(collection(db, 'PendingUsers'), email));
                console.log('Document deleted successfully from ConfirmedUsers');
            } catch (err) {
                console.error('Error deleting document:', err);
            }
        })
    }

    const handleSelectionChange = (newSelection) => {
        console.log(newSelection)
        setSelectedRows(newSelection);
    };
    const handleRuleChange = (event, row) => {
        const {value} = event.target;
        const updatedUsers = [...users];
        const rowIndex = updatedUsers.findIndex((u) => u.id === row.id);
        updatedUsers[rowIndex] = {...updatedUsers[rowIndex], rule: value};
        //setUsers(updatedUsers);
    };

    const columns = [
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
                        <InputLabel id={`rule-select-label-${row.id}`}>Rule</InputLabel>
                        <Select
                            labelId={`rule-select-label-${row.id}`}
                            value={row.rule || ''}
                            onChange={(event) => handleRuleChange(event, row)}
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
        <div style={{height: 400, width: '100%'}}>
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

