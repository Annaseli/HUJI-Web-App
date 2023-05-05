import { useState } from 'react';
import { Button } from '@material-ui/core';
import { saveAs } from 'file-saver';
import exportFromJSON from 'export-from-json'

export default function UsageReport() {
    const [data, setData] = useState([
        {name: 'Alice', age: 25, city: 'New York'},
        {name: 'Bob', age: 30, city: 'San Francisco'},
        {name: 'Charlie', age: 35, city: 'Chicago'},
    ]);

    const handleDownload = () => {
        const date = new Date().toISOString().slice(0, 10);
        const exportType = exportFromJSON.types.csv
        const fileName = `usage_report_${date}`
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
                Download CSV
            </Button>
        </div>
    );
}


