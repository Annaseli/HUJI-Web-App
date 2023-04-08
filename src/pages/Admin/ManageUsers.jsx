import {useState, useEffect} from "react";
import {DataGrid} from "@mui/x-data-grid";
import * as React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

import {SemiTitle} from "../../components/Title";
import Button from "@mui/material/Button";
import {TextField} from "@material-ui/core";

export default function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        setFilteredUsers(users.filter((user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    }, [searchTerm, users]);

    const handleClick = () => {
        selectedRows.forEach((row) => {
            console.log(users[row - 1].id)
            console.log(users[row - 1].rule)
        })
    };


    const handleSelectionChange = (newSelection) => {
        console.log(newSelection);
        setSelectedRows(newSelection);
    };
    const handleRuleChange = (event, row) => {
        const {value} = event.target;
        const updatedUsers = [...users];
        const rowIndex = updatedUsers.findIndex((u) => u.id === row.id);
        const updatedUser = {...updatedUsers[rowIndex], rule: value};
        updatedUsers[rowIndex] = updatedUser;
        setUsers(updatedUsers);
    };
    const columns = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'name', headerName: 'Name', width: 130},
        {field: 'username', headerName: 'Username', width: 130},
        {field: 'email', headerName: 'Email', width: 200},
        {field: 'rule', headerName: 'Rule', width: 200},
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

    const handleDelete = (id) => {
        if (window.confirm(`Are you sure you want to delete user id: ${id}?`)) {
            const updatedUsers = users.filter((u) => u.id !== id);
            setUsers(updatedUsers);
            setSelectedRows([]);
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

