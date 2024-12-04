import React from 'react';
import ReusableDataTable from '../../reusible/Reusible_data_table';

import useLanguage from '../../reusible/useLanguage';


const Agents = () => {


  const { t } = useLanguage();

  const columns = ['fullname', 'business', 'phone',];

  return (
    <>
      <ReusableDataTable
        title={t('agent')}
        url={'api/v1/agents'}
        columns={columns}
        responsive
      />
    </>
  );
};

export default Agents;

