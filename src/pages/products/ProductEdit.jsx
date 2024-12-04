import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


import { Box, Button, FormControl, Paper, TextField, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import axios from 'axios';
import toast from 'react-hot-toast';
import EditIcon from '@mui/icons-material/Edit';
import BackIcon from '../../reusible/BackIcon';
import {
    PacmanLoader
} from 'react-spinners';



export default function ProductEdit() {

    const getToken = () => {
        return Cookies.get('token');
    };

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [commission, setCommission] = useState("");


    const params = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);


    const [err, setErr] = useState(false);
    const [errmsgCo, setErrMsgCo] = useState(null);
    const [errmsgPri, setErrMsgPri] = useState(null);


    const [nameError, setNameError] = useState(false);

    const validateName = () => {
        if (!name) {
            setNameError(true);
        } else {
            setNameError(false);
        }
    }




    // get single data 
    const handleSingleData = () => {
        setLoading(true);
        axios.get(`https://spiky-crater-dep2vxlep8.ploi.online/api/v1/products/${params.id}/edit`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(res => {
            setName(res.data.data.name);
            setPrice(res.data.data.price);
            setCommission(res.data.data.commission);
            // console.log(res.data.data.title);
        }).catch(err => console.log(err)).finally(_ => {
            setLoading(false);
        })
    }

    useEffect(() => {
        handleSingleData();
    }, []);


    // put
    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`https://spiky-crater-dep2vxlep8.ploi.online/api/v1/products/${params.id}`, {
            name, price, commission
        }, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(() => {
            toast.success("Updated Successfully...");
            navigate('/products')
        }).catch(err => {
            // console.log(err.response?.data.message)
            setNameError(err.response?.data.errors.name);
            setErrMsgCo(err.response?.data.errors.commission);
            setErrMsgPri(err.response?.data.errors.price);

            setErr(true);
        });
    }



    return (

        <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">

            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-lg-8 col-md-10 mx-auto">
                        <Paper elevation={3} style={{ padding: '60px', borderRadius: '8px' }}>
                            <BackIcon pathUrl={'/products'} />
                            {/* content page */}
                            <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }} className='pb-[20px] text-center'>Product Edit Form</Typography>
                            {loading ? (
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                                    <PacmanLoader
                                        speedMultiplier={3} color='#3A57E8' loading={loading} size={20} />
                                </div>
                            ) : (
                                <FormControl variant="standard" sx={{ margin: 1, width: "100%", gap: '10px' }} >
                                    <TextField
                                        required
                                        autoComplete='off'
                                        id="outlined-required"
                                        label="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        onBlur={validateName}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: nameError ? 'red' : ''
                                                }
                                            }
                                        }}
                                    />
                                    {
                                        err ? (
                                            <span className='text-red-600'>{nameError}</span>
                                        ) : ''
                                    }
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Price"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: errmsgPri ? 'red' : '',
                                                },
                                            },
                                        }}
                                    />
                                    {
                                        err ? (
                                            <span className='text-red-600'>{errmsgPri}</span>
                                        ) : ''
                                    }
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Commission"
                                        value={commission}
                                        onChange={(e) => setCommission(e.target.value)}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: errmsgCo ? 'red' : '',
                                                },
                                            },
                                        }}
                                    />
                                    {
                                        err ? (
                                            <span className='text-red-600'>{errmsgCo}</span>
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



            </div>
        </main>


    )
}
