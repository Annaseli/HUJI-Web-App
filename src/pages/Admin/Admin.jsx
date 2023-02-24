import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { Button } from "../../components/Button";

export default function Admin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(10);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Role",
      selector: (row) => row.company.bs,
    },
    {
      name: "Approve",
      cell:(row)=> <div>
        <Button size="12" background="#15CE49" id={row.id}>Yes</Button>
        <Button size="12" background="red" id={row.id}>No</Button>
      </div>,
    },
  ];

  useEffect(() => {
    fetchTableData();
  }, []);

  async function fetchTableData() {
    setLoading(true);
    const URL = "https://jsonplaceholder.typicode.com/users";
    const response = await fetch(URL);

    const users = await response.json();
    setData(users);
    setLoading(false);
  }

  return (
    <div style={{ margin: "50px" }}>
      <DataTable
        title="Approve New Users"
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
      />
    </div>
  );
}
