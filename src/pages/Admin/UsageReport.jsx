import { useState } from "react";
import {Button, Select, MenuItem, TextField} from "@material-ui/core";
import exportFromJSON from "export-from-json";
import GetAllReservations from "./GetAllReservations";
import { useCollection } from "../../hooks/useCollection";

import './UsageReport.css';



export default function UsageReport() {
    const { docs: rooms, err } = useCollection("Rooms");
    const [isPending, setIsPending] = useState(false);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

    const years = Array.from(
        { length: new Date().getFullYear() - 2022 },
        (_, index) => 2023 + index
    );

    const handleDownload = async () => {
        if (!selectedYear || !selectedMonth) {
            alert("Please select both year and month.");
            return;
        }
        const year = `${selectedYear}`
        const month = `${selectedMonth}`.padStart(2, '0')
        setIsPending(true);
        const data = await GetAllReservations(year, month, rooms);
        setIsPending(false);
        const exportType = exportFromJSON.types.csv;
        const fileName = `usage_report_${year}_${month}`;
        exportFromJSON({ data, fileName, exportType });
    };

    return (
        <div>
            <h1>Usage Report</h1>
            <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
                <label htmlFor="year-select" >Year:</label>
                <Select
                    menuPortalTarget={document.body} menuPosition={'fixed'}
                    id="year-select"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    MenuProps={{
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                        },
                        transformOrigin: {
                            vertical: "top",
                            horizontal: "left",
                        },
                        getContentAnchorEl: null,
                    }}
                >
                    {years.map((year) => (
                        <MenuItem key={year} value={year}>
                            {year}
                        </MenuItem>
                    ))}
                </Select>
                <label htmlFor="month-select">Month:</label>
                <Select
                    id="month-select"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    MenuProps={{

                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                        },
                        getContentAnchorEl: null,
                    }}
                >
                    {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
                        <MenuItem key={month} value={month}>
                            {month.toString().padStart(2, "0")}
                        </MenuItem>
                    ))}
                </Select>
            </div>
            <Button
                variant="contained"
                color="primary"
                style={{ backgroundColor: "#211d42", color: "white" }}
                onClick={handleDownload}
            >
                {isPending ? "Loading..." : "Download CSV"}
            </Button>
        </div>
    );
}
