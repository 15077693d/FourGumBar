import React from 'react';
function Table({data, columns, className}) {
  // columns = ['c1', 'c2']
  // data = [{'c1':,'c2':},{'c1':,'c2':},{'c1':,'c2':}]
  const columnsNode = columns.map(column => 
    <th>{column}</th>
  )
  const dataNode = data.map(item => 
    <tr>
      {columns.map(column => <td key={column}>{item[column]}</td>)}
    </tr>
  )
  return <table className={className}>
    <thead>
    <tr>
    {columnsNode}
    </tr>
    </thead>
    <tbody >
    {dataNode}
    </tbody>
    </table>
}

export default Table;
