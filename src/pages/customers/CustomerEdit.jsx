import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


import { Alert, Box, Button, FormControl, Paper, Stack, TextField, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import axios from 'axios';
import toast from 'react-hot-toast';
import EditIcon from '@mui/icons-material/Edit';
import BackIcon from '../../reusible/BackIcon';
import {
    PacmanLoader
} from 'react-spinners';


import Select from 'react-select';

export default function CustomerEdit() {



    const [fullname, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");


    const params = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);


    const [err, setErr] = useState(false);
    const [errmsg, setErrMsg] = useState(null);


    const getToken = () => {
        return Cookies.get('token');
    };

    const [agency_id, setAgency_id] = useState(null); // Current agency_id (default or selected)
    const [agencyOptions, setAgencyOptions] = useState([]); // Options from agents API




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



    // Fetch customer data and set default agency_id
    const handleSingleData = () => {
        setLoading(true);
        axios
            .get(`https://spiky-crater-dep2vxlep8.ploi.online/api/v1/customers/${params.id}/edit`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            .then((res) => {
                setFullName(res.data.data.fullname);
                setPhone(res.data.data.phone);
                setAddress(res.data.data.address);

                const agencyIDFromCustomer = res.data.data.agency_id;

                // Check if agency_id from customer API exists in agencyOptions
                const matchedOption = agencyOptions.find(
                    (option) => option.value === agencyIDFromCustomer
                );

                if (!matchedOption) {
                    // If not, add it as a temporary option
                    setAgencyOptions((prev) => [
                        ...prev,
                        { value: agencyIDFromCustomer, label: agencyIDFromCustomer },
                    ]);
                }

                // Set default value for the Select field
                setAgency_id({ value: agencyIDFromCustomer, label: agencyIDFromCustomer });
            })
            .catch(err => console.log(err)).finally(_ => {
                setLoading(false);
            });
    };


    useEffect(() => {
        if (agencyOptions.length > 0) {
            handleSingleData(); // Call this only after agencyOptions is populated
        }
    }, [agencyOptions]);



    const [phoneError, setPhoneError] = useState('');



    const handleUpdate = (e) => {
        e.preventDefault();
        axios
            .put(
                `https://spiky-crater-dep2vxlep8.ploi.online/api/v1/customers/${params.id}`,
                {
                    fullname,
                    phone,
                    address,
                    agency_id: agency_id?.value, // Send only the value (ID)
                },
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            )
            .then(() => {
                toast.success('Updated Successfully...');
                navigate('/customers');
            })
            .catch((err) => {
                console.log(err.response?.data.message);
                console.log(err.response?.data.errors.phone[1])
                setPhoneError(err.response?.data.errors.phone[1])
                setErrMsg(err.response?.data.message);
                setErr(true);
            });
    };




    return (

        <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">

            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-lg-8 col-md-10 mx-auto">
                        <Paper elevation={3} style={{ padding: '60px', borderRadius: '8px' }}>
                            <BackIcon pathUrl={'/customers'} />
                            {/* content page */}
                            <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }} className='pb-[20px] text-center'>Customer Edit Form</Typography>
                            {
                                loading ? (
                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                                        <PacmanLoader
                                            speedMultiplier={3} color='#3A57E8' loading={loading} size={20} />
                                    </div>
                                ) : (

                                    <FormControl variant="standard" sx={{ margin: 1, width: "100%", gap: '10px' }} >
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="Full Name"
                                            type='text'
                                            value={fullname}
                                            autoComplete='off'
                                            onChange={(e) => setFullName(e.target.value)}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: fullname === '' && err ? 'red' : '',
                                                    },
                                                },
                                            }}
                                        />
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="Phone"
                                            autoComplete='off'
                                            // type='number'
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}

                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: phoneError ? 'red' : '',
                                                    },
                                                },
                                            }}
                                        />
                                        {
                                            err ? (
                                                <span className='text-red-600'>{phoneError}</span>
                                            ) : ''
                                        }
                                        <TextField
                                            required
                                            autoComplete='off'
                                            id="outlined-required"
                                            label="Address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: address == '' && err ? 'red' : '',
                                                    },
                                                },
                                            }}
                                        />

                                        <div>
                                            <label htmlFor="Agency_id" className='mb-2'>Agency ID </label>
                                            <Select
                                                options={agencyOptions} // List of valid options
                                                value={agency_id} // Current value (default or selected)
                                                onChange={(selectedOption) => {
                                                    setAgency_id(selectedOption); // Update state on selection
                                                }}
                                                placeholder="Select Agency_ID"
                                                styles={{
                                                    control: (base) => ({
                                                        ...base,
                                                        border: '2px solid #6c757d',
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
                                        </div>


                                    </FormControl>
                                )}
                            <Box display="flex" justifyContent="flex-end" mt={2}>
                                <Button variant="contained"
                                    startIcon={<EditIcon />}
                                    style={{ backgroundColor: '#3A57E8 ', paddingRight: '25px', color: 'white', }}
                                    onClick={handleUpdate}
                                >
                                    Update
                                </Button>
                            </Box>

                        </Paper>
                    </div>
                </div>

            </div>
        </main>


    )
}
