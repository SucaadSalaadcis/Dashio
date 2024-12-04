
import React from 'react';
import ReusableDataTable from '../../reusible/Reusible_data_table';

const User = () => {

    const columns = ['name', 'email',];

    return (

        <>
            <ReusableDataTable
                title="Users"
                url={'api/v1/users'}
                columns={columns}
                responsive
            />
            
        </>
    );
};

export default User;





