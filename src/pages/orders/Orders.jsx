
import { ClipLoader } from 'react-spinners';

import { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-bs5';

import Cookies from 'js-cookie';

import Swal from 'sweetalert2';

import { Box, MenuItem, Select } from '@mui/material';


import PaginationControls from '../../reusible/PaginationControls';


import { Edit, View } from '../../reusible/Add_Edit_View';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


import axiosPublicURL from '../../../src/hooks/AxiosHook';

import OrderPost from './OrderPost';



export default function Orders() {

  const useAxios = axiosPublicURL();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [ordersData, setOrdersData] = useState([]);
  const [pageSize, setPageSize] = useState(10);  // Default page size

  const getToken = () => Cookies.get('token');

  const handleAllData = async (page = 1) => {
    try {
      setLoading(true);
      const response = await useAxios.get(`api/v1/orders?page=${page}&limit=${pageSize}`, {
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
        setOrdersData(data);
      } else {
        console.error('Expected an array but received:', data);
        setOrdersData([data]);
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

  useEffect(() => {
    if (ordersData.length > 0 && !$.fn.DataTable.isDataTable('#example')) {
      $('#example').DataTable({
        responsive: true,
        lengthChange: false,
        autoWidth: false,
        paging: false, // Disable DataTables pagination
        info: false, // Hide "Showing 1 to 10 of 10 entries" text
        search: true,
      });
    }
  }, [loading]);



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
        useAxios.delete(`api/v1/orders/${id}`, {
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
        <h3>Orders</h3>
        <OrderPost handleRefreshData={handleAllData} />
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


        <table id="example"
          className="table mt-4"
          style={{ width: "100%", tableLayout: "auto" }}
        >
          <thead>
            <tr>
              <th>Product</th>
              <th>Customer</th>
              <th>Agent</th>
              <th className='text-start'>Product Price</th>
              <th className='text-start'>Product Commission</th>
              <th>Status</th>
              <th className='text-end'>Actions</th>

            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', height: '100px', verticalAlign: 'middle' }}>
                  <ClipLoader color="#3A57E8" loading={loading} size={50} />
                </td>
              </tr>

            ) : (

              ordersData.map((order, index) => (
                <tr key={index}>
                  <td className='text-start'>{order.product && order.product.name ? order.product.name : <p style={{ color: 'red' }}> Not Assigned</p>}</td>
                  <td className='text-start'>{order.customer && order.customer[0] ? order.customer[0].fullname : <p style={{ color: 'red' }}> Not Assigned</p>}</td>
                  <td className='text-start'>{order.agent && order.agent[0] ? order.agent[0].fullname : <p style={{ color: 'red' }}> Not Assigned</p>}</td>
                  <td className='text-start'>{order.product_price && order.product_price.price ? order.product_price.price : <p style={{ color: 'red' }}> Not Assigned</p>}</td>
                  <td className='text-start' >{order.product_commission && order.product_commission.commission ? order.product_commission.commission : 'Not Assigned'}</td>
                  {/* <td >{order.status_label ? order.status_label : 'Not Assigned'}</td> */}
                  <td className='text-start' style={{ color: order.status_label == 'UnPaid' ? 'red' : '' }}>{order.status_label ? order.status_label : 'Not Assigned'}</td>

                  {/* actions */}
                  {/*  */}
                  <td className='text-start' >
                    <div class="dropdown">
                      <a class="btn border-0  dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <MoreHorizIcon />
                      </a>

                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item">  <View veiwParam={order.id} /></a></li>
                        <li><a class="dropdown-item">  <Edit EditParam={order.id} /></a></li>
                        <li><a class="dropdown-item"> <p style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}
                          onClick={() => handleDelete(order.id)} >Delete</p></a>
                        </li>
                      </ul>
                    </div>


                  </td>
                </tr>
              ))
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
  )
}




// ///

// <table id="example"
//   className="table mt-3"
//   style={{ width: "100%", tableLayout: "auto" }}
// >
//   <thead>
//     <tr>
//       <th>Product</th>
//       <th>Customer</th>
//       <th>Agent</th>
//       <th>Product Price</th>
//       <th>Product Commission</th>
//       <th>Status</th>
//       <th>Actions</th>

//     </tr>
//   </thead>
//   <tbody>
//     {loading ? (
//       <tr>
//         <td colSpan={7} style={{ textAlign: 'center', height: '100px', verticalAlign: 'middle' }}>
//           <GridLoader color="#007BFF" loading={loading} size={15} />
//         </td>
//       </tr>

//     ) : (

//       ordersData.map((order, index) => (
//         <tr key={index}>
//           <td>{order.product && order.product.name ? order.product.name : 'Not Assigned'}</td>
//           <td>{order.customer && order.customer[0] ? order.customer[0].fullname : 'Not Assigned'}</td>
//           <td>{order.agent && order.agent[0] ? order.agent[0].fullname : 'Not Assigned'}</td>
//           <td>{order.product_price && order.product_price.price ? order.product_price.price : 'Not Assigned'}</td>
//           <td>{order.product_commission && order.product_commission.commission ? order.product_commission.commission : 'Not Assigned'}</td>
//           <td>{order.status_label ? order.status_label : 'Not Assigned'}</td>

//           {/* actions */}
//           {/*  */}
//           <td className='text-end' >
//             <Dropdown size="sm">
//               <Dropdown.Toggle variant="" id="" className='border-0'>
//                 <MoreHorizIcon />
//               </Dropdown.Toggle>

//               <Dropdown.Menu>
//                 <Dropdown.Item href="#">

//                   {/*  view component*/}
//                   <View veiwParam={order.id} />

//                   {/* <h6>View</h6> */}
//                 </Dropdown.Item>
//                 <Dropdown.Item href="#">
//                   {/* edit component */}
//                   <Edit EditParam={order.id} />
//                   {/* <h6>Edit</h6> */}
//                 </Dropdown.Item>
//                 <Dropdown.Item href="#">

//                   <p style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}
//                     onClick={() => handleDelete(order.id)} >Delete</p>

//                   {/* <h6>Delete</h6> */}
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>


//           </td>
//         </tr>
//       ))
//     )}

//   </tbody>
// </table>