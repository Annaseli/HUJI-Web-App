import React, { useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    makeStyles,
    TextField,
    Typography,
    Select,
    MenuItem, InputLabel
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import { Button } from '@material-ui/core';
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
    title: {
        textAlign: 'center',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: theme.spacing(2),
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
    },
    textField: {
        marginBottom: theme.spacing(2),
    },
}));
const StyledButton = styled(Button)`
  && {
    margin-left: 16px;
    background-color: #211d42;
    color: #f1f1f1;

    &:hover {
      background-color: #f0c14b;
      opacity: 0.8;
    }
  }
`;

function ModalForAdmin(props ) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [roomNum, setRoomNum] = useState(props.roomNum);
    const [title, setTitle] = useState(props.roomTitle);
    const [userType, setUserType] = useState('');
    const [capacity, setCapacity] = useState('');

    const handleClickOpen = (editing) => {
        setOpen(true);
        setEditing(editing);
    };

    const handleClose = () => {
        setOpen(false);
        setEditing(false);
    };

    const handleEdit = () => {
        setEditing(true);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(roomNum, userType, capacity, title)
        // TODO: Add logic to save changes to Firestore
        handleClose();
    };

    return (
        <>
            <div className={classes.title}>
                <Typography variant="h6">{title}</Typography>
            </div>
            <Button onClick={() => handleClickOpen(false)}> view setting </Button>
            <IconButton onClick={() => handleClickOpen(true)}>
                <EditIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    {editing ? 'Edit Room' : 'View Room Details'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Fill in the information about the room.
                    </DialogContentText>
                    <form onSubmit={handleSubmit} className={classes.form}>
                        <TextField
                            label="Room Number"
                            value={roomNum}
                            onChange={(e) => setRoomNum(e.target.value)}
                        />
                        <TextField
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <TextField
                            label="Capacity"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                        />
                        {!editing ? (<TextField
                            label="User Type"
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                        />) : (<>
                            <InputLabel id="user-type-label">User Type</InputLabel>

                            <Select
                            labelId="user-type-label"
                            id="user-type"
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                        >
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="team">Team</MenuItem>
                            <MenuItem value="user">User</MenuItem>
                        </Select>
                        </>)
                        }
                        {editing && (
                            <DialogActions>
                                {/*<StyledButton onClick={handleClose} color="secondary">*/}
                                {/*    Cancel*/}
                                {/*</StyledButton>*/}
                                {/*<Button color={"#211d42"} background={"#ffffff"} border={"#211D42"}>*/}
                                {/*Save*/}
                                {/*</Button>*/}
                                <StyledButton
                                    type="submit"
                                    variant="contained"
                                >
                                    Save
                                </StyledButton>
                            </DialogActions>

                        )}
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default ModalForAdmin;
