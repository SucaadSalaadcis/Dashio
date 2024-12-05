import React, { useEffect, useState } from 'react'

import { FormControl, TextField, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import axios from 'axios';
import toast from 'react-hot-toast';

import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';

import Select from 'react-select';

import AddCircleIcon from '@mui/icons-material/AddCircle';

import qs from 'qs';

import useLanguage from '../../reusible/useLanguage';


export default function CustomerPost() {

    const { t, i18n } = useLanguage();
    const isRtl = i18n.language === 'ar'; // Check if the language is Arabic


    // modal state
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [agencyOptions, setAgencyOptions] = useState([]);


    const [selectedAgencies, setSelectedAgencies] = useState([]);

    /*     agencyOptions: Stores the formatted options for react-select.
    selectedAgencies: Stores the selected options from the dropdown. */

    const [fullname, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const [err, setErr] = useState(false);
    const [errmsg, setErrMsg] = useState(null);

    // toggle button active/disable
    const [activeBtn, setActiveBtn] = useState(false);



    // Validate fields dynamically
    useEffect(() => {
        if (fullname && phone && address) {
            setActiveBtn(true);
        } else {
            setActiveBtn(false);
        }
    }, [fullname, phone, address]);

    const getToken = () => {
        return Cookies.get('token');
    };

    const handleGet = () => {
        axios.get('https://spiky-crater-dep2vxlep8.ploi.online/api/v1/agents', {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                "Content-Type": 'application/json'
            }
        }).then(res => {
            const options = res.data.data.map((ele) => ({
                value: ele.id,
                label: ele.id
            }));
            setAgencyOptions(options);
        }).catch(error => {
            console.error("Error fetching agency data:", error);
        });
    };

    useEffect(() => {
        handleGet();
    }, []);




    const handlePost = async () => {
        setActiveBtn(false);
        // Extract and ensure selected IDs are integers
        const selectedIds = Array.isArray(selectedAgencies)
            ? selectedAgencies.map((agency) => parseInt(agency.value, 10)) // Handle multiple selected
            : [parseInt(selectedAgencies.value, 10)]; // Handle single selected

        // Prepare the data object
        const data = {
            fullname,
            phone,
            address,
            agency_id: selectedIds.length === 1 ? selectedIds[0] : selectedIds, // Send single integer if only one ID is selected
        };

        // console.log(agencyOptions.map((ele) => ele.value));


        try {
            const response = await axios.post(

                "https://spiky-crater-dep2vxlep8.ploi.online/api/v1/customers",
                qs.stringify(data), // Ensure the correct format for x-www-form-urlencoded
                {
                    headers: {
                        'Authorization': `Bearer ${getToken()}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }

            );
            setErr(false);
            if (response.data) {
                toast.success('Registered Successfully!');
                setTimeout(() => {
                    handleClose();
                }, 300); // 300 milliseconds (0.3 seconds)

                window.location.reload(1);
                setFullName("");
                setPhone("");
                setAddress("");
                setSelectedAgencies([]);
            }
        } catch (error) {

            console.log(error.response?.data.message)
            setErrMsg(error.response?.data.message)
            setErr(true);
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
                        {t('cust')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/*  */}
                    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">

                        <div class="container-fluid py-4">
                            <div class="row">
                                <div class="col-lg-8 col-md-10 mx-auto">

                                    {/* content page */}
                                    <Typography sx={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', fontSize: '22px' }}>{t('cust_p_f')}</Typography>
                                    <FormControl variant="standard" sx={{ margin: 1, width: "100%", gap: '10px' }} >

                                        <TextField
                                            required
                                            autoComplete='off'
                                            id="outlined-required"
                                            label="Full Name"
                                            value={fullname}
                                            onChange={(e) => setFullName(e.target.value)}
                                        />
                                        <TextField
                                            required
                                            autoComplete='off'
                                            id="outlined-required"
                                            type='number'
                                            label="Phone"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}

                                        />
                                        <TextField
                                            required
                                            autoComplete='off'
                                            id="outlined-required"
                                            label="Address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                        <Select
                                            options={agencyOptions}
                                            value={selectedAgencies}
                                            onChange={(selected) => setSelectedAgencies(selected)} // Updates selected option(s)
                                            placeholder="Select Agency_ID"
                                            styles={{
                                                control: (base) => ({
                                                    ...base,
                                                    border: `2px solid ${errmsg ? 'red' : ''}`,
                                                    borderRadius: '8px',
                                                    padding: '5px',
                                                }),
                                                placeholder: (base) => ({
                                                    ...base,
                                                    color: '#495057',
                                                    fontSize: '16px',
                                                    padding: '8px',
                                                }),
                                            }}
                                        />


                                        {
                                            err ? (
                                                err ? (
                                                    <span className='text-red-600'>{errmsg}</span>
                                                ) : ''
                                            ) : ''
                                        }
                                    </FormControl>


                                </div>
                            </div>


                        </div>
                    </main>
                    {/*  */}
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
                        onClick={handlePost}
                    >
                        {t('save_changes')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}
