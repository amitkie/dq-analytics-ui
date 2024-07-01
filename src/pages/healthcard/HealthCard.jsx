import React from "react";
import SideBar from "../../components/sidebar/SideBar";
import TableComponent from "../../components/tableComponent/TableComponent";
import { getData } from "../../services/q3";

export default function HealthCard() {
  const data = getData();

  const columns = [
    {
      header: "S.no",
      accessor: {},
    },
    { header: "Brands", accessor: "Brands" },
    { header: "Category", accessor: "Category" },
  ];
  return (
    <div className="row g-0">
      <div className="col-1">
        <SideBar />
      </div>
      <div className="col-11">
        <div className="workspace-container">
          <h2 className="page-title mt-4 ml-3">Health Card</h2>
          <TableComponent data={data} columns={columns} />
        </div>
      </div>
    </div>
  );
}
