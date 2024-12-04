
import React from 'react';
import ReusableDataTable from '../../reusible/Reusible_data_table';

import useLanguage from '../../reusible/useLanguage';

const Products = () => {

  const { t } = useLanguage();

  const columns = ['name', 'price', 'commission',];

  return (
    <>
      <ReusableDataTable
        title={t('product')}
        url={'api/v1/products'}
        columns={columns}
        responsive
      />
    </>
  );
};

export default Products;

