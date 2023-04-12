import Box from '@mui/material/Box';
import {DataGrid} from '@mui/x-data-grid';
import { SemiTitle } from '../../components/Title';
import Button from "@mui/material/Button";
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from "@mui/material/IconButton";


const handleCancel = (reservation_id) => {
  if (window.confirm(`Are you sure you want to this reservation ?`)) {
    console.log(reservation_id)
    // deleateFromDB(reservation_id) #TODO: anna to add backend
  }
};
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'room',
    headerName: 'Room',
    width: 150,
    editable: false,
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 150,
    type: 'date',
    editable: false,
  },
  {
    field: 'startHour',
    headerName: 'Start Time',
    type: 'time',
    width: 120,
    editable: false,
  },
  {
    field: 'endHour',
    headerName: 'End Time',
    type: 'time',
    width: 120,
    editable: false,
  },
  {
    field: 'peopleNum',
    headerName: 'Number of People Invited',
    editable: false,
    type: 'number',
    width: 110,
  },{
    field: 'delete',
    headerName: 'Delete',
    width: 150,
    renderCell: (params) => (
        <IconButton sx={{ color: 'red' }} onClick={() => handleCancel(params.row.id)}>
          <CancelIcon />
        </IconButton>
    ),
  },
];

const rows = [
  { id: 1, room: 'A1', startTime: '08:00', endTime: '12:00', capacity: 3 },
  { id: 2, room: 'A1', startTime: '08:00', endTime: '12:00', capacity: 3 },
  { id: 23, room: 'A1', startTime: '08:00', endTime: '12:00', capacity: 3 },
  { id: 4, room: 'A1', startTime: '08:00', endTime: '12:00', capacity: 3 },
  { id: 5, room: 'A1', startTime: '08:00', endTime: '12:00', capacity: 3 },
  { id: 6, room: 'A1', startTime: '08:00', endTime: '12:00', capacity: 3 },
  { id: 7, room: 'A1', startTime: '08:00', endTime: '12:00', capacity: 3 },
  { id: 8, room: 'A1', startTime: '08:00', endTime: '12:00', capacity: 3 },
];

export default function MyReservations() {
  return (
      <Box sx={{ height: 400, width: '100%' }}>
        <SemiTitle>My Reservations</SemiTitle>
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            // checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
  );
}