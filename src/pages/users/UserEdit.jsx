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



export default function UserEdit() {

    const getToken = () => {
        return Cookies.get('token');
    };


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [role, setRole] = useState("");



    const params = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);


    const [err, setErr] = useState(false);
    const [errmsg, setErrMsg] = useState(null);



    // get single data 
    const handleSingleData = () => {
        setLoading(true);
        axios.get(`https://spiky-crater-dep2vxlep8.ploi.online/api/v1/users/${params.id}/edit`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(res => {
            setName(res.data.data.name);
            setEmail(res.data.data.email);
            setPassword(res.data.data.password);
            setRole(res.data.data.role ? [{ id: 1, fullname: role }] : [],);
            // console.log(res.data.data.title);
        }).catch(err => console.log(err)).finally(_ => {
            setLoading(false);
        })
    }

    useEffect(() => {
        handleSingleData();
    }, []);



    const [nameError, setNameError] = useState(false);

    const validateName = () => {
        if (!name) {
            setNameError(true);
        } else {
            setNameError(false);
        }
    }



    // put
    const handleUpdate = (e) => {
        e.preventDefault();

        try {
            axios.put(`https://spiky-crater-dep2vxlep8.ploi.online/api/v1/users/${params.id}`, {
                name, email, password, roles: role.trim() ? [{ id: 1, fullname: role }] : [],
            }, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }).then(() => {
                toast.success("Updated Successfully...");
                navigate('/users')
            }).catch(err => {
                // setErrMsg(err.message)
                console.log(err.message)
                setErrMsg('Role field is required')
                setErr(true);
            });

        } catch (error) {
            console.log(error.message)
            setErrMsg('Role field is required')
            setErr(true);
        }

    }



    return (

        <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">

            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-lg-8 col-md-10 mx-auto">
                        <Paper elevation={3} style={{ padding: '60px', borderRadius: '8px' }}>
                            <BackIcon pathUrl={'/users'} />
                            {/* content page */}
                            <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }} className='pb-[20px] text-center'>User Edit Form</Typography>
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
                                            label="Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: name === '' && err ? 'red' : '',
                                                    },
                                                },
                                            }}
                                        />
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: email === '' && err ? 'red' : '',
                                                    },
                                                },
                                            }}
                                        />
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: password === '' && err ? 'red' : '', // Default border color
                                                    },
                                                },
                                            }}
                                        />
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="Role"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: errmsg ? 'red' : '', // Default border color
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
