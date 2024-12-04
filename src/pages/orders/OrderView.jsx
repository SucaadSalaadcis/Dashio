import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import Select from 'react-select';
import Cookies from 'js-cookie';

import axios from 'axios';


import { useParams } from "react-router-dom";

import { Box, FormControl, Paper, TextField, Typography } from '@mui/material';
import BackIcon from "../../reusible/BackIcon";
import { HashLoader } from "react-spinners";



export default function OrderView() {


    const getToken = () => Cookies.get('token');

    // State management
    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [agents, setAgents] = useState([]);
    const [productPrices, setProductPrices] = useState([]);
    const [productCommisions, setProductCommisions] = useState([]);

    const [selectedOrders, setSelectedOrders] = useState([]);

    const [selectedCustomer, setSelectedCustomer] = useState([]);
    const [selectedAgent, setSelectedAgent] = useState([]);

    const [selectedProductPrice, setSelectedProductPrice] = useState(null);
    const [selectedProductCommision, setSelectedProductCommision] = useState(null);

    const [selectStatus, setSelectedStatus] = useState('');



    const params = useParams();

    const [loading, setLoading] = useState(true);


    // Fetch all data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const orderResponse = await axios.get('https://spiky-crater-dep2vxlep8.ploi.online/api/v1/orders/create', {
                    headers: {
                        'Authorization': `Bearer ${getToken()}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });
                setOrders(orderResponse.data.meta.product || []);
                setProductPrices(orderResponse.data.meta.product_price || []);
                setProductCommisions(orderResponse.data.meta.product_commission || []);

                const customerResponse = await axios.get('https://spiky-crater-dep2vxlep8.ploi.online/api/v1/customers', {
                    headers: { 'Authorization': `Bearer ${getToken()}` },
                });
                setCustomers(customerResponse.data.data);

                const agentResponse = await axios.get('https://spiky-crater-dep2vxlep8.ploi.online/api/v1/agents', {
                    headers: { 'Authorization': `Bearer ${getToken()}` },
                });
                setAgents(agentResponse.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);


    // edit data
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(
                    `https://spiky-crater-dep2vxlep8.ploi.online/api/v1/orders/${params.id}/edit`,
                    {
                        headers: {
                            'Authorization': `Bearer ${getToken()}`,
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    }
                );

                const order = response.data.data;

                // Safely checking if data exists before setting state
                if (order?.product) {
                    setSelectedOrders([{ value: order.product.id, label: order.product.name }]);
                }

                if (order?.customer?.length > 0) {
                    setSelectedCustomer({ value: order.customer[0].id, label: order.customer[0].fullname });
                }

                if (order?.agent?.length > 0) {
                    setSelectedAgent({ value: order.agent[0].id, label: order.agent[0].fullname });
                }

                if (order?.product_price) {
                    setSelectedProductPrice({ value: order.product_price.id, label: `${order.product_price.price}` });
                } else {
                    setSelectedProductPrice(null);
                }

                if (order?.product_commission) {
                    setSelectedProductCommision({ value: order.product_commission.id, label: `${order.product_commission.commission}` });
                } else {
                    setSelectedProductCommision(null);
                }


                setSelectedStatus(order?.status_label || '');


            } catch (err) {
                console.error('Error fetching order:', err);
                toast.error("Failed to fetch order.");
            }
        };

        fetchOrder();
    }, [params.id]);



    return (

        <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">

            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-lg-8 col-md-10 mx-auto">
                        <Paper elevation={3} style={{ padding: '60px', borderRadius: '8px' }}>
                            <BackIcon pathUrl={'/orders'} />
                            {/* content page */}
                            <Typography sx={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>Order View Form</Typography>
                            {
                                loading ? (
                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                                        <HashLoader color='#3A57E8' loading={loading} size={50} />
                                    </div>
                                ) : (

                                    <FormControl variant="standard" sx={{ margin: 1, width: "100%", gap: '10px' }} >
                                        <Select options={orders.map(order => ({ value: order.id, label: order.name }))} isMulti value={selectedOrders} onChange={setSelectedOrders} />
                                        <Select options={customers.map(cust => ({ value: cust.id, label: cust.fullname }))} isMulti value={selectedCustomer} onChange={setSelectedCustomer} />
                                        <Select options={agents.map(agent => ({ value: agent.id, label: agent.fullname }))} isMulti value={selectedAgent} onChange={setSelectedAgent} />
                                        <Select options={productPrices.map(price => ({ value: price.id, label: `${price.price}` }))} value={selectedProductPrice} onChange={setSelectedProductPrice} />
                                        <Select options={productCommisions.map(comm => ({ value: comm.id, label: `${comm.commission}` }))} value={selectedProductCommision} onChange={setSelectedProductCommision} />
                                        <Box>Status</Box>
                                        <TextField
                                            required
                                            id="outlined-required"
                                            value={selectStatus}
                                            onChange={(e) => setSelectedStatus(e.target.value)}
                                        />
                                    </FormControl>
                                )}
                        </Paper>
                    </div>

                    {/* </div> */}
                </div>



            </div>
        </main>

    )
}
