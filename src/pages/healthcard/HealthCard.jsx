import React from "react";

export default function HealthCard() {
  return (
    <div className="row g-0">
      <div className="col-1">
        <SideBar />
      </div>
      <div className="col-11">
        <div className="workspace-container">
          <h2 className="page-title mt-4 ml-3">Health Card</h2>
          <Table responsive striped bordered>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Brand Name</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Digital Assessment - 1</td>
                <td>Beauty</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Digital Assessment - 1</td>
                <td>Beauty</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Digital Assessment - 1</td>
                <td>Beauty</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
