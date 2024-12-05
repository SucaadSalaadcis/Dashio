import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import Select from 'react-select';
import Cookies from 'js-cookie';

import axios from 'axios';

import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useParams } from "react-router-dom";


import { Box, Button, FormControl, Paper, TextField, Typography } from '@mui/material';


import BackIcon from "../../reusible/BackIcon";
import {
    PacmanLoader



} from "react-spinners";


import useLanguage from '../../reusible/useLanguage';


export default function OrderEdit() {

    const { t, i18n } = useLanguage();
  
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

    const [selectedProduct_price_id, setSelectedProduct_price_id] = useState('');
    const [selectedProduct_commission_id, setSelectedProduct_commission_id] = useState('');
    const [selectStatus, setSelectedStatus] = useState('');
    const [selectProduct_id, setSelectedProduct_id] = useState('');

    const [ownerId, setOwnerId] = useState(null); // if you have it in state


    const params = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);


    const [err, setErr] = useState(false);

    const [errmsgPro_id, setErrMsgPro_id] = useState(null);
    const [errmsgStatus, setErrMsgStatus] = useState(null);
    const [errmsgAgent, setErrMsgAgent] = useState(null);
    const [errmsgCustomer, setErrMsgCustomer] = useState(null);


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

                setSelectedProduct_price_id(order?.product_price_id || '');
                setSelectedProduct_commission_id(order?.product_commission_id || '');
                setSelectedStatus(order?.status_label || '');
                setSelectedProduct_id(order?.product_id || '');
                setOwnerId(order?.owner_id || '');

            } catch (err) {
                console.error('Error fetching order:', err);
                console.log(err.response?.data.message)
                setErrMsgPro_id(err.response?.data.errors.product_id);
                setErrMsgStatus(err.response?.data.errors.status);
                setErrMsgCustomer(err.response?.data.errors.customer);
                setErrMsgAgent(err.response?.data.errors.agent);
                setErr(true);

            }
        };

        fetchOrder();
    }, [params.id]);




    // put
    const handleUpdate = async (e) => {
        e.preventDefault();

        // Ensure selectedCustomer and selectedAgent are arrays before mapping
        const customerArray = Array.isArray(selectedCustomer)
            ? selectedCustomer.map(cust => ({
                id: cust.value,
                fullname: cust.label, // Assuming the label contains the fullname
            }))
            : [];

        const agentArray = Array.isArray(selectedAgent)
            ? selectedAgent.map(ag => ({
                id: ag.value,
                fullname: ag.label, // Assuming the label contains the fullname
            }))
            : [];

        // Construct the data based on selected values
        const data = {
            product_price_id: selectedProductPrice?.value || '',
            product_commission_id: selectedProductCommision?.value || '',
            owner_id: ownerId || '', // Assuming you have an owner ID available
            agent: agentArray, // Array of agent objects
            customer: customerArray, // Array of customer objects
            product_id: selectProduct_id || '',
            status: selectStatus || '', // Changed from status_label to status
        };



        try {
            const response = await axios.put(
                `https://spiky-crater-dep2vxlep8.ploi.online/api/v1/orders/${params.id}`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${getToken()}`,
                        'Content-Type': 'application/json', // Use JSON for this API
                    },
                }
            );

            console.log('Order updated successfully:', response.data);
            toast.success("Order updated successfully!");
            navigate('/orders')
        } catch (err) {
            console.error('Error updating order:', err);

            if (err.response?.status === 422) {
                console.log(err.response?.data.errors)
                setErrMsgPro_id(err.response?.data.errors.product_id);
                setErrMsgStatus(err.response?.data.errors.status);
                setErrMsgCustomer(err.response?.data.errors.customer);
                setErrMsgAgent(err.response?.data.errors.agent);
                setErr(true);

                console.log(err.response?.data.errors);

            } else {
                setErr(true);
                setErrMsgPro_id(err.response?.data.errors.product_id);
                setErrMsgStatus(err.response?.data.errors.status);
                setErrMsgCustomer(err.response?.data.errors.customer);
                setErrMsgAgent(err.response?.data.errors.agent);
            }
        }
    };






    return (

        <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">

            <div class="container-fluid py-4">
                <div class="row">
                  
                    {/* content page */}
                    <Paper elevation={3} style={{ padding: '70px', borderRadius: '8px' }}>
                        <BackIcon pathUrl={'/orders'} />
                        {/* content page */}
                        <Typography sx={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', fontSize: '22px' }}>{t('order_E_f')}</Typography>
                        {
                            loading ? (
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                                    <PacmanLoader


                                        speedMultiplier={2} color='#3A57E8' loading={loading} size={20} />
                                </div>
                            ) : (

                                <FormControl variant="standard" sx={{ margin: 1, width: "90%", gap: '10px' }} >
                                    <Select options={orders.map(order => ({ value: order.id, label: order.name }))} isMulti value={selectedOrders} onChange={setSelectedOrders} />
                                    <Select
                                        styles={{
                                            control: (base) => ({
                                                ...base,
                                                borderColor: errmsgCustomer ? 'red' : base.borderColor,
                                                boxShadow: "none",
                                            }),
                                        }}
                                        options={customers.map(cust => ({ value: cust.id, label: cust.fullname }))} isMulti value={selectedCustomer} onChange={setSelectedCustomer} />
                                    {
                                        err ? (
                                            <span className='text-red-600'>{errmsgCustomer}</span>
                                        ) : ''
                                    }
                                    <Select
                                        styles={{
                                            control: (base) => ({
                                                ...base,
                                                borderColor: errmsgAgent ? 'red' : base.borderColor,
                                                boxShadow: "none",
                                            }),
                                        }}
                                        options={agents.map(agent => ({ value: agent.id, label: agent.fullname }))} isMulti value={selectedAgent} onChange={setSelectedAgent} />
                                    {
                                        err ? (
                                            <span className='text-red-600'>{errmsgAgent}</span>
                                        ) : ''
                                    }

                                    <Select options={productPrices.map(price => ({ value: price.id, label: `${price.price}` }))} value={selectedProductPrice} onChange={setSelectedProductPrice} />
                                    <Select options={productCommisions.map(comm => ({ value: comm.id, label: `${comm.commission}` }))} value={selectedProductCommision} onChange={setSelectedProductCommision} />

                                    <Box>Product_price_id</Box>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        value={selectedProduct_price_id}
                                        onChange={(e) => setSelectedProduct_price_id(e.target.value)}

                                    />

                                    <Box>Product_commission_id</Box>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        value={selectedProduct_commission_id}
                                        onChange={(e) => setSelectedProduct_commission_id(e.target.value)}
                                    />

                                    <Box>Product_id</Box>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        value={selectProduct_id}
                                        onChange={(e) => setSelectedProduct_id(e.target.value)}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: errmsgPro_id ? 'red' : '',
                                                },
                                            },
                                        }}
                                    />
                                    {
                                        err ? (
                                            <span className='text-red-600'>{errmsgPro_id}</span>
                                        ) : ''
                                    }

                                    <Box>Owner_id</Box>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        value={ownerId}
                                        onChange={(e) => setOwnerId(e.target.value)}
                                    />


                                    <Box>Status 1/2</Box>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        value={selectStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: errmsgStatus ? 'red' : '', 
                                                },
                                            },
                                        }}
                                    />
                                    {
                                        err ? (
                                            <span className='text-red-600'>{errmsgStatus}</span>
                                        ) : ''
                                    }

                                </FormControl>
                            )}
                        <Box display="flex" justifyContent="flex-end" mt={2}>
                            <Button variant="contained"
                                startIcon={<EditIcon />}
                                style={{ backgroundColor: '#3A57E8 ', paddingRight: '25px', color: 'white' }}
                                onClick={handleUpdate}
                            >
                                Update
                            </Button>
                        </Box>

                    </Paper>

                </div>

            </div>
        </main>
    )
}
