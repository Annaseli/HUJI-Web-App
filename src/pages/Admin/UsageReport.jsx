import { useState } from 'react';
import { Button } from '@material-ui/core';
import { saveAs } from 'file-saver';
import exportFromJSON from 'export-from-json'
import GetAllReservations from "./GetAllReservations";
import {useCollection} from "../../hooks/useCollection";

export default function UsageReport() {
    const { docs: rooms, err } = useCollection("Rooms")
    const [isPending, setIsPending] = useState(false)
    // const [data, setData] = useState([
    //     {name: 'Alice', age: 25, city: 'New York'},
    //     {name: 'Bob', age: 30, city: 'San Francisco'},
    //     {name: 'Charlie', age: 35, city: 'Chicago'},
    // ]);

    const handleDownload = async () => {
        //const date = new Date().toISOString().slice(0, 10);
        const year = "2023"
        const month = "07"
        setIsPending(true)
        const data = await GetAllReservations(year, month, rooms)
        setIsPending(false)
        const exportType = exportFromJSON.types.csv
        const fileName = `usage_report_${year}_${month}`
        // const csvData = convertToCSV(data);
        // const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        // saveAs(blob, 'usage_report.csv');
        exportFromJSON({data, fileName, exportType})
    };
     // background={"#ffffff"}
    return (
        <div>
            <h1>Usage Report</h1>
            <Button
                variant="contained"
                color="primary"
                style={{ backgroundColor: '#211d42', color: 'white' }}
                onClick={handleDownload}
            >
                {isPending ? 'Loading...' : 'Download CSV'}
            </Button>
        </div>
    );
}


