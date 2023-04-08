import * as React from 'react';
import Box from '@mui/material/Box';
import {DataGrid} from '@mui/x-data-grid';
import { SemiTitle } from '../../components/Title';

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
    field: 'startTime',
    headerName: 'Start Time',
    type: 'time',
    width: 120,
    editable: false,
  },
  {
    field: 'endTime',
    headerName: 'End Time',
    type: 'time',
    width: 120,
    editable: false,
  },
  {
    field: 'capacity',
    headerName: 'Capacity',
    editable: false,
    type: 'number',
    width: 110,
  },
];

const rows = [
  { id: 1, room: 'A1', startTime: '08:00', endTime: '12:00', capacity: 3 },
  { id: 2, room: 'A1', startTime: '08:00', endTime: '12:00', capacity: 3 },
  { id: 3, room: 'A1', startTime: '08:00', endTime: '12:00', capacity: 3 },
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
            checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
  );
}