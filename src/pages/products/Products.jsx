
import React from 'react';
import ReusableDataTable from '../../reusible/Reusible_data_table';

const Products = () => {

  const columns = ['name', 'price', 'commission',];

  return (
    <>
      <ReusableDataTable
        title="Products"
        url={'api/v1/products'}
        columns={columns}
        responsive
      />
    </>
  );
};

export default Products;

