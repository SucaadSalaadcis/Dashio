
import React from 'react';
import ReusableDataTable from '../../reusible/Reusible_data_table';

const Customer = () => {

  const columns = ['fullname', 'phone', 'address', 'agency_id'];

  return (
    <>
      <ReusableDataTable
        title="Customers"
        url={'api/v1/customers'}
        columns={columns}
        responsive
      />
    </>
  );
};

export default Customer;


