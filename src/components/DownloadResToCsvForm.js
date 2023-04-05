// import { useEffect, useState } from "react";
// import { useFirestore } from "../../hooks/useFirestore";
// import { useCollection } from "../../hooks/useCollection"
// import GetUsersRes from "../../components/GetUsersRes";

// import { createObjectCsvWriter } from "csv-writer";
// //import { workbook, worksheet } from "xlsx";
// //import { writeFile } from "fs/promises"; 
// //import { readFileSync } from 'fs';
// //import XLSX from 'xlsx';
// import { read, utils } from 'xlsx';


// // firebase imports
// import { db } from "../../firebase/config";
// import { collection, getCountFromServer, deleteDoc, doc, setDoc, deleteField , updateDoc, query, where, getDocs, getDoc  } from "firebase/firestore";

// export default function DownloadResToCsvForm({ year, month, day, selectedRoomNum}) {

//     const [data, setData] = useState('') 

//     useEffect(() => {
//         async function fetchData() {
//             // Get data from collection
//             const docRefOfYearMonth = doc(collection(db, "Reservations"), `${year}${month}`)
//             const docRefOfYearMonthDay = doc(collection(docRefOfYearMonth, `${year}${month}Reservations`), `${year}${month}${day}`)
//             const collectionRef = collection(docRefOfYearMonthDay, `${year}${month}${day}Reservations`)
//             const querySnapshot = await getDocs(collectionRef)
//             const data = querySnapshot.docs.map((doc) => doc.data());
//             setData(data)
//         }
//         fetchData()
//     }, [])

//     const handleSubmit = async (event) => {
//         // Convert data to CSV format
//         const csvWriter = createObjectCsvWriter({
//             path: "data.csv",
//             header: ["field1", "field2", "field3"] // replace with your field names
//         });
//         await csvWriter.writeRecords(data);

        
//         //const csvFile = await readFile("data.csv");
//         //const workbookObj = workbook.read(csvFile, { type: "buffer" });
//         //writeFile("data.xlsx", workbookObj.write({ type: "buffer", bookType: "xlsx" }));

//         // const csvFile = readFileSync('data.csv');
//         // const csvData = csvFile.toString();
//         // const workbook = XLSX.read(csvData, { type: 'string' });
//         // const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//         // const excelFile = XLSX.utils.sheet_to_excel(worksheet);

//         // Write data to Excel file
//         fetch('/data.csv')
//         .then(response => response.text())
//         .then(csvData => {
//             const workbook = read(csvData, { type: 'string' });
//             const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//             const excelFile = utils.sheet_to_excel(worksheet);
//   });

//     }

//     return (
//         <div>
//         <h2>Download Res To Csv Form</h2>
//             <form onSubmit={handleSubmit} >                       
//                 <button>Download</button>
//             </form>
//         </div>
//     )   
// }