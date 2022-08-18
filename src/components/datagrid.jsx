import DataGrid from 'devextreme-react/data-grid';

function GridData() {
  const columns = ['CompanyName', 'City', 'State', 'Phone', 'Fax','Website','Zipcode'];
    return (
        <DataGrid
          dataSource="./customers.json"
          defaultColumns={columns}
          showBorders={true}
        />
      );
}

export default GridData;
