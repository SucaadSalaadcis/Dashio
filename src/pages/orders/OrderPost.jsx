import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import Select from 'react-select';
import Cookies from 'js-cookie';

import axios from 'axios';

import AddCircleIcon from '@mui/icons-material/AddCircle';


import { Box, FormControl, TextField, Typography } from '@mui/material';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import useLanguage from '../../reusible/useLanguage';


export default function OrderPost({ handleRefreshData }) {


    const { t, i18n } = useLanguage();
    const isRtl = i18n.language === 'ar'; // Check if the language is Arabic


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


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
    const [ownerId, setOwnerId] = useState('');



    const [err, setErr] = useState(false);
    const [errmsgPro_id, setErrMsgPro_id] = useState(null);
    const [errmsgStatus, setErrMsgStatus] = useState(null);

    // toggle button active/disable
    const [activeBtn, setActiveBtn] = useState(false);

    // error msg
    const [errmsgAgent, setErrMsgAgent] = useState(null);
    const [errmsgCustomer, setErrMsgCustomer] = useState(null);
    const [errmsg_comm, setErrMsg_comm] = useState(null);
    const [errmsg_price, setErrMsg_price] = useState(null);



    useEffect(() => {
        const fetchData = async () => {
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
            }
        };
        fetchData();
    }, []);


    // Validate fields dynamically
    useEffect(() => {
        if (orders && customers && agents && productPrices && productCommisions && selectProduct_id && ownerId && selectedProduct_price_id && selectedProduct_commission_id && selectStatus) {
            setActiveBtn(true);
        } else {
            setActiveBtn(false);
        }
    }, [orders, customers, agents, productPrices, productCommisions, selectProduct_id, ownerId, selectedProduct_price_id, selectedProduct_commission_id, selectStatus]);



    const postOrderData = async () => {
        // e.preventDefault();
        setActiveBtn(false);

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

        console.log('data:', data);


        try {
            const response = await axios.post(
                `https://spiky-crater-dep2vxlep8.ploi.online/api/v1/orders`, // Ensure this is the correct endpoint for creating/updating orders
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${getToken()}`,
                        'Content-Type': 'application/json', // Use JSON for this API
                    },
                }
            );
            setErr(false);
            // console.log('Order updated successfully:', response.data);
            toast.success("Order Registered successfully!");
            handleRefreshData();

            setTimeout(() => {
                handleClose();
            }, 300);


        } catch (err) {
            console.error('Error updating order:', err);

            if (err.response?.status === 422) {

                console.log(err.response?.data.errors)
                setErr(true);

                setErrMsgPro_id(err.response?.data.errors.product_id);
                setErrMsgStatus(err.response?.data.errors.status);
                setErrMsgCustomer(err.response?.data.errors.customer);
                setErrMsgAgent(err.response?.data.errors.agent);
                setErrMsg_price(err.response?.data.errors.product_price_id);
                setErrMsg_comm(err.response?.data.errors.product_commission_id);

            } else {
                setErr(true);

                setErrMsgPro_id(err.response?.data.errors.product_id);
                setErrMsgStatus(err.response?.data.errors.status);
                setErrMsgCustomer(err.response?.data.errors.customer);
                setErrMsgAgent(err.response?.data.errors.agent);
                setErrMsg_price(err.response?.data.errors.product_price_id);
                setErrMsg_comm(err.response?.data.errors.product_commission_id);
            }
        } finally {
            setActiveBtn(true);
        }
    };




    return (



        <>
            <button onClick={handleShow} >
                <AddCircleIcon style={{ fontSize: '55px' }} className='rounded-lg text-[#3A57E8]' />
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header
                    closeButton
                    style={{
                        flexDirection: isRtl ? 'row-reverse' : 'row', // Reverse row direction for RTL
                        justifyContent: 'space-between', // Ensure proper spacing
                        alignItems: 'center', // Vertically center items
                    }}
                >
                    <Modal.Title
                        style={{
                            margin: 0,
                            textAlign: isRtl ? 'right' : 'left', // Align text direction dynamically
                            flex: 1, // Take up available space
                            marginRight: '10px'
                        }}
                    >
                        {t('order')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">

                        <div class="container-fluid py-4">
                            <div class="row">


                                {/* content page */}
                                <Typography sx={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', fontSize: '22px' }}>{t('order_P_f')}</Typography>
                                <FormControl variant="standard" sx={{ margin: 1, width: "90%", gap: '10px', marginLeft: '23px' }} >
                                    <Select
                                        options={orders.map(order => ({ value: order.id, label: order.name }))} isMulti value={selectedOrders} onChange={setSelectedOrders} />
                                    {/* cust */}
                                    <Select styles={{
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
                                    {/* agent */}
                                    <Select styles={{
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

                                    {/* price */}
                                    <Select styles={{
                                        control: (base) => ({
                                            ...base,
                                            borderColor: errmsg_price ? 'red' : base.borderColor,
                                            boxShadow: "none",
                                        }),
                                    }}
                                        options={productPrices.map(price => ({ value: price.id, label: `${price.price}` }))} value={selectedProductPrice} onChange={setSelectedProductPrice} />
                                    {
                                        err ? (
                                            <span className='text-red-600'>{errmsg_price}</span>
                                        ) : ''
                                    }
                                    {/* commision */}
                                    <Select styles={{
                                        control: (base) => ({
                                            ...base,
                                            borderColor: errmsg_comm ? 'red' : base.borderColor,
                                            boxShadow: "none",
                                        }),
                                    }}
                                        options={productCommisions.map(comm => ({ value: comm.id, label: `${comm.commission}` }))} value={selectedProductCommision} onChange={setSelectedProductCommision} />
                                    {
                                        err ? (
                                            <span className='text-red-600'>{errmsg_comm}</span>
                                        ) : ''
                                    }

                                    <Box>Product_price_id</Box>
                                    <TextField
                                        required
                                        autoComplete='off'
                                        id="outlined-required"
                                        value={selectedProduct_price_id}
                                        onChange={(e) => setSelectedProduct_price_id(e.target.value)}
                                    />

                                    <Box>Product_commission_id</Box>
                                    <TextField
                                        required
                                        autoComplete='off'
                                        id="outlined-required"
                                        value={selectedProduct_commission_id}
                                        onChange={(e) => setSelectedProduct_commission_id(e.target.value)}
                                    />

                                    <Box>Product_id</Box>
                                    <TextField
                                        required
                                        autoComplete='off'
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
                                        autoComplete='off'
                                        id="outlined-required"
                                        value={ownerId}
                                        onChange={(e) => setOwnerId(e.target.value)}
                                    />

                                    <Box>Status</Box>
                                    <TextField
                                        required
                                        autoComplete='off'
                                        id="outlined-required"
                                        value={selectStatus}
                                        placeholder="Enter 1 OR 2"
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


                            </div>

                        </div>
                    </main>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    {t('close')}
                    </Button>

                    <Button
                        variant="primary"
                        disabled={!activeBtn}
                        style={{
                            backgroundColor: activeBtn ? '#3A57E8' : '#c0caf7',
                            border: 'none',
                        }}
                        onClick={postOrderData}
                    >
                       {t('save_changes')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}
