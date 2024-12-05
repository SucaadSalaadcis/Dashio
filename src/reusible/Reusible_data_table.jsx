

import React, { useEffect, useMemo, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-bs5';
import Cookies from 'js-cookie';

import axiosPublicURL from '../../src/hooks/AxiosHook';

import PaginationControls from '../reusible/PaginationControls'
import { ClipLoader } from 'react-spinners';
import { Box, MenuItem, Select } from '@mui/material';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { Edit, View } from './Add_Edit_View';


import Swal from 'sweetalert2';

import AgentPost from '../pages/agents/AgentPost';
import { useLocation } from 'react-router-dom';
import CustomerPost from '../pages/customers/CustomerPost';
import ProductPost from '../pages/products/ProductPost';
import UserPost from '../pages/users/UserPost';

import useLanguage from './useLanguage';

const ReusableDataTable = ({ title, columns, url, }) => {

    const { t } = useLanguage();

    const location = useLocation();


    const useAxios = axiosPublicURL();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [pageSize, setPageSize] = useState(10);  // Default page size

    const getToken = () => Cookies.get('token');

    const handleAllData = async (page = 1) => {
        try {
            setLoading(true);
            const response = await useAxios.get(`${url}?page=${page}&limit=${pageSize}`, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            const data = response.data?.data || [];
            const lastPage = response.data.last_page || 1;
            setTotalPages(lastPage);
            setCurrentPage(page);

            if (Array.isArray(data)) {
                setData(data);
            } else {
                console.error('Expected an array but received:', data);
                setData([data]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleAllData(currentPage);
    }, [currentPage, pageSize]);

    // console.log(data);



    // Memoize the language object to prevent unnecessary re-creation
    const language = useMemo(() => ({
        search: t('search'),
    }), [t]);

    useEffect(() => {
        if (data.length > 0 && !$.fn.DataTable.isDataTable('#example')) {
            $('#example').DataTable({
                responsive: true,
                lengthChange: false,
                autoWidth: false,
                paging: false, // Disable DataTables pagination
                info: false,   // Hide "Showing 1 to 10 of 10 entries" text
                search: true,
                language: language,
            });
        }
    }, [data, language,]); // Ensure the effect runs only when data or language changes




    // useEffect(() => {
    //     // Destroy DataTable if it already exists
    //     if ($.fn.DataTable.isDataTable('#example')) {
    //         $('#example').DataTable().destroy();
    //     }

    //     // Reinitialize the DataTable
    //     if (data.length > 0) {
    //         $('#example').DataTable({
    //             responsive: true,
    //             lengthChange: false,
    //             autoWidth: false,
    //             paging: false, // Disable DataTables pagination
    //             info: false,   // Hide "Showing 1 to 10 of 10 entries" text
    //             searching: true,
    //             language: language // Use the memoized language object
    //         });
    //     }
    // }, [data, language]); // Re-run effect when data or language changes









    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
    };


    // delete data 
    const handleDelete = (id) => {
        const useAxios = axiosPublicURL();

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                useAxios.delete(`${url}/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${getToken()}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }).then(() => {
                    handleAllData();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your data has been deleted.",
                        icon: "success"
                    });
                }).catch((error) => {
                    console.log("Error deleting the record: ", error);
                });
            }
        });
    };



    return (

        <div
            className="mt-4 container-fluid"
            style={{ overflowX: "auto", backgroundColor: "white", padding: "20px", borderRadius: "10px" }}
        >
            <div className='flex justify-between'>
                <h3>{title}</h3>
                {
                    location.pathname === '/agents' ? <AgentPost />
                        : location.pathname === '/customers' ? <CustomerPost />
                            : location.pathname == '/products' ? <ProductPost />
                                : location.pathname == '/users' ? <UserPost />
                                    : ''
                }


            </div>

            <div className="table-responsive">
                <Box className='md:relative md:top-[28px]  md:ml-0 ml-[100px]'>
                    <span className='text-lg text-[#8A92A6]' >Showing</span>
                    <Select
                        labelId="page-size-label"
                        id="page-size"
                        color='#8A92A6'
                        size='small'
                        value={pageSize}
                        onChange={handlePageSizeChange}
                        label="Page Size"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                    </Select>
                    <span className='text-lg text-[#8A92A6]' >entries</span>

                </Box>

                <table
                    id="example"
                    className="table mt-4"
                    style={{ width: "100%" ,tableLayout: "auto" }}
                >
                    <thead>
                        <tr>
                            {columns.map((col, index) => (
                                <>
                                    <th className='text-start' key={index}>{col}</th>
                                </>
                            ))}
                            <th className='text-start'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length + 1} className="text-center">
                                    <ClipLoader color="#3A57E8" loading={loading} size={50} />
                                </td>
                            </tr>
                        ) : (
                            data && data.length > 0 ? (
                                data.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {columns.map((col, i) => (
                                            <td key={i} className="text-start" style={{ color: '#232D42', fontFamily: 'Inter', fontWeight: '400', fontSize: '15px', lineHeight: '24.7px' }}>
                                                {row[col]}
                                                {/* {console.log(row.fullname)} */}
                                            </td>
                                        ))}

                                        {/*  */}
                                        <td className='text-start' >


                                            <div class="dropdown">
                                                <a class="btn border-0  dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <MoreHorizIcon />
                                                </a>

                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item">  <View veiwParam={row.id} /></a></li>
                                                    <li><a class="dropdown-item">  <Edit EditParam={row.id} /></a></li>
                                                    <li><a class="dropdown-item"> <p style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}
                                                        onClick={() => handleDelete(row.id)} >{t('del')}</p></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length + 1} className="text-center">No Data Available</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    pageS={pageSize}
                    setCurrentPage={setCurrentPage}
                />

            </div>
        </div>


    );
};

export default ReusableDataTable;
