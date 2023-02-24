// import React, { useState } from 'react';
// import { makeStyles } from "@material-ui/core/styles";
// import { DatePicker } from '@material-ui/pickers';
// import Button from "@material-ui/core/Button";
//
// const useStyles = makeStyles({
//     drawer: {
//         width: "250px",
//     },
//     filterButton: {
//         marginTop: "16px",
//     },
// });
//
// function FilterMenu(props) {
//     const [selectedDate, setSelectedDate] = useState(new Date());
//
//     const handleDateChange = (date) => {
//         setSelectedDate(date);
//         props.onFilter()
//     };
//
//     return (
//         <div>
//             <DatePicker
//                 label="Select Date"
//                 value={selectedDate}
//                 onChange={handleDateChange}
//             />
//             <Button variant="contained" color="primary">
//                 Filter
//             </Button>
//         </div>
//     );
// }
//
// export default FilterMenu;x