// import React, { useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
//
// const useStyles = makeStyles((theme) => ({
//     form: {
//         '& > *': {
//             margin: theme.spacing(1),
//             width: '25ch',
//         },
//     },
//     list: {
//         width: '50ch',
//     },
// }));
//
// function ConferenceRoomReservation() {
//     const classes = useStyles();
//     const [reservations, setReservations] = useState([]);
//
//     const handleReservationSubmit = (event) => {
//         event.preventDefault();
//         const form = event.target;
//         const data = new FormData(form);
//
//         const reservation = {
//             name: data.get('name'),
//             startTime: data.get('startTime'),
//             endTime: data.get('endTime')
//         };
//
//         setReservations([...reservations, reservation]);
//         form.reset();
//     }
//
//     return (
//         <div>
//             <h1>Conference Room Reservations</h1>
//             <form className={classes.form} onSubmit={handleReservationSubmit}>
//                 <TextField
//                     id="name"
//                     label="Name"
//                     name="name"
//                     required
//                 />
//                 <br />
//                 <TextField
//                     id="startTime"
//                     label="Start Time"
//                     name="startTime"
//                     type="time"
//                     required
//                     inputProps={{
//                         step: 300, // 5 min
//                     }}
//                 />
//                 <br />
//                 <TextField
//                     id="endTime"
//                     label="End Time"
//                     name="endTime"
//                     type="time"
//                     required
//                     inputProps={{
//                         step: 300, // 5 min
//                     }}
//                 />
//                 <br />
//                 <Button variant="contained" type="submit">
//                     Make Reservation
//                 </Button>
//             </form>
//             <hr />
//
//         </div>
//     );
// }
//
// export default ConferenceRoomReservation;
