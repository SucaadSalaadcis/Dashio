
import React from 'react';
import ReusableDataTable from '../../reusible/Reusible_data_table';


import useLanguage from '../../reusible/useLanguage';

const Customer = () => {
  
  
  const { t } = useLanguage();

  const columns = ['fullname', 'phone', 'address', 'agency_id'];

  return (
    <>
      <ReusableDataTable
        title={t('cust')}
        url={'api/v1/customers'}
        columns={columns}
        responsive
      />
    </>
  );
};

export default Customer;


