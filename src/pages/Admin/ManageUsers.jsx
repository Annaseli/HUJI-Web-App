import {useState, useEffect} from "react";
import {DataGrid} from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import {SemiTitle} from "../../components/Title";
import Button from "@mui/material/Button";
import {TextField} from "@material-ui/core";
import {collection, deleteDoc, doc} from "firebase/firestore";
import {db} from "../../firebase/config";

export default function ManageUsers({ allUsers }) {
    const [users, setUsers] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        const createUsers = allUsers.map(userDoc => ({
            id: userDoc.id,
            email: userDoc.email,
            name: userDoc.name,
            userType: userDoc.userType
        }));
        setUsers(createUsers);
    }, [allUsers]);

    useEffect(() => {
        users && setFilteredUsers(users.filter((user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    }, [users]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleClick = () => {
        selectedRows.forEach((row) => {
            console.log(users[row - 1].id)
            console.log(users[row - 1].userType)
        })
    };

    const handleSelectionChange = (newSelection) => {
        console.log(newSelection);
        setSelectedRows(newSelection);
    }

    const columns = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'name', headerName: 'Name', width: 130},
        {field: 'email', headerName: 'Email', width: 200},
        {field: 'userType', headerName: 'User Type', width: 200},
        {
            field: 'delete',
            headerName: 'Delete',
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
            //setUsers(users.filter((u) => u.id !== id));
            setUsers(users.filter((u) => u.id !== id))
            setSelectedRows([]);

            // delete user from the Users collection
            try {
                await deleteDoc(doc(collection(db, 'Users'), id));
                console.log('Document deleted successfully from Users');
            } catch (err) {
                console.error('Error deleting document:', err);
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
            <DataGrid
                rows={filteredUsers}
                //rows={users}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[10]}
                // checkboxSelection
                disableSelectionOnClick
                onSelectionModelChange={handleSelectionChange}
            />
        </div>
    );
}

