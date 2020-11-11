import React from "react";

function Table({ countries }) {
  return (
    <table className="table">
        <tbody className="table justify-between">
          {countries.map(({ country, cases }) => (
            <tr className="table-row-group" key={country}>
              <td>{country}</td>
              <td>{cases}</td>
            </tr>
          ))}
        </tbody>
    </table>
  );
}

export default Table;
