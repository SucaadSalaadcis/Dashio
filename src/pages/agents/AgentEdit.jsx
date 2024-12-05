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

import useLanguage from '../../reusible/useLanguage';


export default function AgentEdit() {

    const { t, i18n } = useLanguage();
    const isRtl = i18n.language === 'ar'; // Check if the language is Arabic



    const getToken = () => {
        return Cookies.get('token');
    };


    const [fullname, setFullName] = useState("");
    const [description, setDescription] = useState("");
    const [business, setBusiness] = useState("");
    const [phone, setPhone] = useState("");

    const params = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [err, setErr] = useState(false);
    const [errmsg, setErrMsg] = useState(null);



    // get single data 
    const handleSingleData = () => {
        setLoading(true);
        axios.get(`https://spiky-crater-dep2vxlep8.ploi.online/api/v1/agents/${params.id}/edit`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(res => {
            setFullName(res.data.data.fullname);
            setDescription(res.data.data.description);
            setBusiness(res.data.data.business);
            setPhone(res.data.data.phone);
            // console.log(res.data.data.title);
        }).catch(err => console.log(err)).finally(_ => {
            setLoading(false);
            setErr(true);
        })
    }

    useEffect(() => {
        handleSingleData();
    }, []);





    // put
    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`https://spiky-crater-dep2vxlep8.ploi.online/api/v1/agents/${params.id}`, {
            fullname, description, business, phone
        }, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(() => {
            setErr(false);
            toast.success("Updated Successfully...");
            navigate('/agents')
        }).catch(err => {
            // toast.error('Failed to register agent:', error.response?.data || error.message);
            console.log(err.response?.data.errors.phone)
            setErrMsg(err.response?.data.errors.phone)
            setErr(true);
        });
    }




    return (


        <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">

            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-lg-8 col-md-10 mx-auto">

                        <Paper elevation={3} style={{ padding: '60px', borderRadius: '8px' }}>
                            <BackIcon pathUrl={'/agents'} />
                            {/* content page */}
                            <Typography sx={{ fontWeight: 'bold', fontSize: '22cpx' }} className='pb-[20px] text-center'>{t('agent_E_f')}</Typography>
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
                                            label={t('fullname')}
                                            value={fullname}
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
                                            label={t('description')}
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: description == '' && err ? 'red' : '',
                                                    },
                                                },
                                            }}

                                        />

                                        <TextField
                                            required
                                            id="outlined-required"
                                            label={t('business')}
                                            value={business}
                                            onChange={(e) => setBusiness(e.target.value)}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: business === '' && err ? 'red' : '',
                                                    },
                                                },
                                            }}

                                        />


                                        <TextField
                                            required
                                            id="outlined-required"
                                            label={t('phone')}
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: errmsg ? 'red' : '',
                                                    },
                                                },
                                            }}

                                        />

                                        {
                                            err ? (
                                                <span className='text-red-600'>{errmsg}</span>
                                            ) : ''
                                        }
                                    </FormControl>
                                )}
                            <Box
                                display="flex"
                                justifyContent={isRtl ? 'flex-start' : 'flex-end'} 
                                mt={2}
                            >
                                <Button
                                    variant="contained"
                                    startIcon={<EditIcon />}
                                    style={{
                                        backgroundColor: '#3A57E8',
                                        color: 'white',
                                    }}
                                    onClick={handleUpdate}
                                >
                                    <p
                                        style={{
                                            direction: isRtl ? 'rtl' : 'ltr',
                                            margin: 0, 
                                            marginRight: '10px'
                                        }}
                                    >
                                        {t('update')}
                                    </p>
                                </Button>
                            </Box>


                        </Paper>
                    </div>
                </div>


            </div>
        </main>

    )
}
