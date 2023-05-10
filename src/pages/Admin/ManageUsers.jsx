import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import { TextField } from "@material-ui/core";

// components
import { SemiTitle } from "../../components/Title";

// firebase
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";

export default function ManageUsers({ allUsers }) {
    //const [users, setUsers] = useState([]);
    //const [selectedRows, setSelectedRows] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    // useEffect(() => {
    //     setIsPending(true)
    //     const createUsers = allUsers.map(userDoc => ({
    //         id: userDoc.id,
    //         email: userDoc.email,
    //         name: userDoc.name,
    //         userType: userDoc.userType
    //     }));
    //     setUsers(createUsers);
    //     if(!isCancelled) {
    //         setIsPending(false)
    //     }
    // }, [allUsers]);

    useEffect(() => {
        setIsPending(true)
        allUsers && setFilteredUsers(allUsers.filter((user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        ));
        if(!isCancelled) {
            setIsPending(false)
        }
        return () => setIsCancelled(true)
    }, [allUsers]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // const handleSelectionChange = (newSelection) => {
    //     console.log(newSelection);
    //     setSelectedRows(newSelection);
    // }

    const columns = [
        {field: "id", headerName: "ID", width: 70},
        {field: "name", headerName: "Name", width: 130},
        {field: "email", headerName: "Email", width: 200},
        {field: "userType", headerName: "User Type", width: 200},
        {
            field: "delete",
            headerName: "Delete",
            width: 150,
            renderCell: (params) => (
                <Button
                    variant='filled'
                    color="tertiary"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(params.row.id)}
                >
                    Delete User
                </Button>
            ),
        },
    ];

    const handleDelete = async (id) => {
        if (window.confirm(`Are you sure you want to delete user id: ${id}?`)) {
            allUsers.filter((u) => u.id !== id)
            setError(null)
            setIsPending(true)

            // delete user from the Users collection
            try {
                await deleteDoc(doc(collection(db, "Users"), id));
                if (!isCancelled) {
                    setError(null)
                    setIsPending(false)
                    console.log("user deleted successfuly")
                }

            } catch (error) {
                if (!isCancelled) {
                    setError(error.message || "unknown error occurred")
                    setIsPending(false)
                }
            }

            // delete the user from firebase authentication
            // TODO: after deploy do this:
            // const functions = getFunctions();
            // const deleteUser = httpsCallable(functions, 'deleteUser');
            // try {
            //     const result = await deleteUser({ uid: id })
            //     console.log(result.data); // 'Successfully deleted user'
            // } catch(error) {
            //     console.log('Error deleting user:', error);
            //     setError(error.message)
            // }
        }
    };

    return (
        <div style={{height: 400, width: '100%'}}>
            <SemiTitle>Manege Users </SemiTitle>
            <TextField
                label="Search by name"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{marginBottom: 16}}
            />
            {!isPending && <DataGrid
                rows={filteredUsers}
                //rows={users}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[10]}
                // checkboxSelection
                disableSelectionOnClick
                //onSelectionModelChange={handleSelectionChange}
            />}
            {isPending && <p>loading...</p>}
            {error && <p>{ error }</p>}
        </div>
    );
}

