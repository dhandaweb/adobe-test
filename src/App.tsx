import React, { useMemo, useState, } from 'react';
import { SORT, IHEADER, ITABLEROW } from './types/types';
import { tableColumnInitialValues, apiURL } from './constants/constants';

import './App.css';


function App() {


  const [tableData, setTableData] = useState<ITABLEROW[]>([]);
  const [tableHeader, setTableHeader] = useState<IHEADER[]>(tableColumnInitialValues);
  const [filteredTableData, setFilteredTableData] = useState<ITABLEROW[]>([]);

  useMemo(() => {
    fetch(apiURL).then(response => response.text())
      .then(data => {
        const locations = JSON.parse(data).results.map((d: any) => d.location);
        setTableData(locations);
        setFilteredTableData(locations)
      })
  }, [apiURL])

  const handleSearchTable = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchedValue = e.target.value.toLowerCase();
    if (searchedValue) {
      const filteredData = tableData.filter((row: ITABLEROW) => {
        return row.city.toLowerCase().indexOf(searchedValue) > -1
          || row.state.toLowerCase().indexOf(searchedValue) > -1
          || row.country.toLowerCase().indexOf(searchedValue) > -1
          || row.street.name.toLowerCase().indexOf(searchedValue) > -1
          || String(row.coordinates.latitude).indexOf(searchedValue) > -1
          || String(row.coordinates.longitude).indexOf(searchedValue) > -1
          || String(row.street.number).indexOf(searchedValue) > -1
          || String(row.postcode).indexOf(searchedValue) > -1
      });
      setFilteredTableData(filteredData);
    }
    else {
      setFilteredTableData(tableData)
    }

  }

  const handleTableHeaderSort = (item: IHEADER) => {
    let sortItemBy = SORT.UNSORTED;
    let sortedData = filteredTableData;

    if (item.sortBy === SORT.UNSORTED) {
      sortItemBy = SORT.ASCENDING;
      //Acending
      sortedData = filteredTableData.sort((a: any, b: any) => {
        if (item.type === "number") { // properly sorting numbers values
          return item.subSelector
            ? a[item.selector][item.subSelector] - (b[item.selector][item.subSelector])
            : a[item.selector] - (b[item.selector])
        }
        else return item.subSelector
          ? a[item.selector][item.subSelector].localeCompare(b[item.selector][item.subSelector])
          : a[item.selector].localeCompare(b[item.selector])
      })
    }
    else if (item.sortBy === SORT.ASCENDING) {
      // descending
      sortItemBy = SORT.DESCENDING;
      sortedData = filteredTableData.sort((a: any, b: any) => {
        if (item.type === "number") {
          return item.subSelector
            ? b[item.selector][item.subSelector] - (a[item.selector][item.subSelector])
            : b[item.selector] - (a[item.selector])
        }
        else return item.subSelector
          ? b[item.selector][item.subSelector].localeCompare(a[item.selector][item.subSelector])
          : b[item.selector].localeCompare(a[item.selector])
      })
    }
    else {
      sortItemBy = SORT.UNSORTED;
      sortedData = filteredTableData;
    }


    const updatedHeader = tableHeader.map((tableItem: IHEADER) => {
      if (tableItem.label === item.label) tableItem.sortBy = sortItemBy;
      else tableItem.sortBy = SORT.UNSORTED;
      return tableItem;
    });

    setTableHeader(updatedHeader);
    setFilteredTableData(sortedData);

  }

  return (
    <div className="App">
      <h1>Adobe Interview test</h1>
      <h4>Type in the text box to filter table</h4>
      <input onKeyUp={handleSearchTable} />


      {filteredTableData && (<table>
        <thead>
          <tr>
            {tableHeader && tableHeader.map((item: IHEADER) => (
              <th key={item.label}><a onClick={() => { handleTableHeaderSort(item) }}>
                <span>{item.label}</span>
                <p>{item.sortBy}</p>
              </a></th>
            ))}
          </tr>
        </thead>

        <tbody>
          {filteredTableData.map((row: ITABLEROW, i: number) => {
            return <tr key={`${i}row`}>
              <td>{row.city}</td>
              <td>{row.state}</td>
              <td>{row.country}</td>
              <td>{row.postcode}</td>
              <td>{row.street.number}</td>
              <td>{row.street.name}</td>
              <td>{row.coordinates.latitude}</td>
              <td>{row.coordinates.longitude}</td>
            </tr>
          })}
        </tbody>
      </table>)
      }
    </div >
  );
}

export default App;
