
import React from 'react';
import ReusableDataTable from '../../reusible/Reusible_data_table';

import useLanguage from '../../reusible/useLanguage';

const User = () => {

    const { t } = useLanguage();

    const columns = ['name', 'email',];

    return (

        <>
            <ReusableDataTable
                title={t('user')}
                url={'api/v1/users'}
                columns={columns}
                responsive
            />
            
        </>
    );
};

export default User;





