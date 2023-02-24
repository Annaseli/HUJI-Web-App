import React from 'react';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import {DB} from "./DB_TEST";
import {RoomCard} from "./RoomCard"
// const rooms = [
//     { id: 1, name: 'Room 1', size: 20, description: 'This is a description for Room 1', image: 'room1.jpg' },
//     { id: 2, name: 'Room 2', size: 25, description: 'This is a description for Room 2', image: 'room2.jpg' },
//     { id: 3, name: 'Room 3', size: 30, description: 'This is a description for Room 3', image: 'room3.jpg' },
//     { id: 4, name: 'Room 4', size: 35, description: 'This is a description for Room 4', image: 'room4.jpg' },
// ];
const useStyles = makeStyles((theme) => ({
    card: {
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '150px',
        width: '150px',
        backgroundColor: theme.palette.secondary.main,
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    roomName: {
        marginTop: theme.spacing(2),
        fontWeight: 600,
    },
    roomSize: {
        marginTop: theme.spacing(1),
    },
}));
RoomCard.propTypes = {
    room: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        size: PropTypes.number.isRequired,
        isAvailable: PropTypes.string.isRequired,
    }).isRequired,
};




const rooms = DB.getRooms()

function RoomGrid() {
    if (!rooms || rooms.length === 0) {
        return <div>No rooms found</div>;
    }
    return (
        <Grid container spacing={2}>
            {rooms.map((room) => (
                <Grid item xs={12} sm={6} md={4} key={room.id}>
                    <RoomCard room={room} />
                </Grid>
            ))}
        </Grid>
    );
}
RoomGrid.propTypes = {
    rooms: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            size: PropTypes.number.isRequired,
            isAvailable: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
};
export default RoomGrid;
