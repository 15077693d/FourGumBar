import React from 'react';
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
function Table(data) {

  return (
   <ReactTable data={data} columns={[{
    Header: "地址",
    accessor: "地址"
  },{
            Header: "金額ETH",
            accessor: "金額ETH"
          }]}/>
  );
}

export default Table;
