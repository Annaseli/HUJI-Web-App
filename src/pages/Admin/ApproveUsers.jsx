import DataTable from "react-data-table-component";
import {useState, useEffect} from "react";
import {Button} from "../../components/Button";
import {DataGrid} from "@mui/x-data-grid";
import * as React from "react";
import {FormControl, InputLabel, Select} from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
import {SemiTitle} from "../../components/Title";
import Box from "@mui/material/Box";

export default function ApproveUsers() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [perPage, setPerPage] = useState(10);

    const [users, setUsers] = useState([]);
    const [selectedRows, setSelectedRows] = React.useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error(error));
    }, []);
    const handleApproveClick = () => {
        selectedRows.forEach((row) => {
            console.log(users[row - 1].id)
            console.log(users[row - 1].rule)
        })
    };

    function handleDenyClick() {
        selectedRows.forEach((row) => {
            console.log(users[row - 1].id)
            console.log(users[row - 1].rule)
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
        const updatedUser = {...updatedUsers[rowIndex], rule: value};
        updatedUsers[rowIndex] = updatedUser;
        setUsers(updatedUsers);
    };
    const columns = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'name', headerName: 'Name', width: 130},
        {field: 'username', headerName: 'Username', width: 130},
        {field: 'email', headerName: 'Email', width: 200},
        {
            field: 'rule',
            headerName: 'Rule',
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

