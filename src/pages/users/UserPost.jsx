import React, { useEffect, useState } from 'react'

import { FormControl, TextField, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import axios from 'axios';
import toast from 'react-hot-toast';

import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';


import AddCircleIcon from '@mui/icons-material/AddCircle';

import useLanguage from '../../reusible/useLanguage';


export default function UserPost() {


    const { t, i18n } = useLanguage();
    const isRtl = i18n.language === 'ar'; // Check if the language is Arabic


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState('');


    const [err, setErr] = useState(false);
    const [errmsg, setErrMsg] = useState(null);

    // toggle button active/disable
    const [activeBtn, setActiveBtn] = useState(false);

    // Validate fields dynamically
    useEffect(() => {
        if (name && email && password && role) {
            setActiveBtn(true);
        } else {
            setActiveBtn(false);
        }
    }, [name, email, password, role]);




    // post 
    const handlePost = async () => {
        // e.preventDefault();
        setActiveBtn(false);

        // Prepare data for API
        const data = {
            name,
            email,
            password,
            roles: role.trim() ? [{ id: 1, fullname: role }] : [], // Only include role if it's provided
        };





        try {
            const token = Cookies.get('token');
            const response = await axios.post('https://spiky-crater-dep2vxlep8.ploi.online/api/v1/users', data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            setErr(false);
            toast.success('Registered Successfuly...');

            setTimeout(() => {
                handleClose();
            }, 300);

            setName('')
            setEmail('')
            setPassword('')
            setRole('')

            window.location.reload(1);

        } catch (error) {
            // toast.error('Error posting user:', error.response?.data || error.message);
            console.log(error.response?.data.message);
            console.log(error)
            setErrMsg(error.response?.data.message)
            setErr(true)
        } finally {
            setActiveBtn(true);
        }

    }


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
                        {t('user')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">

                        <div class="container-fluid py-4">
                            <div class="row">
                                <div class="col-lg-8 col-md-10 mx-auto">


                                    {/* content page */}
                                    <Typography sx={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', fontSize: '22px' }}>{t('user_P_f')}</Typography>
                                    <FormControl variant="standard" sx={{ margin: 1, width: "100%", gap: '10px' }} >
                                        <TextField
                                            required
                                            autoComplete='off'
                                            id="outlined-required"
                                            label="Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <TextField
                                            required
                                            autoComplete='off'
                                            id="outlined-required"
                                            label="Email"
                                            value={email}
                                            error={err} // This adds the red border automatically if `err` is true
                                            // helperText={err ? "Password is required" : ""} // Displays an error message if `err` is true
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: err ? 'red' : '',
                                                    },
                                                },
                                            }}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        {
                                            err ? (
                                                <span className='text-red-600'>{errmsg}</span>
                                            ) : ''
                                        }
                                        <TextField
                                            required
                                            autoComplete="off"
                                            id="outlined-required"
                                            label="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}

                                        />

                                        <TextField
                                            required
                                            autoComplete='off'
                                            id="outlined-required"
                                            label="Role"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                        />
                                    </FormControl>

                                </div>
                            </div>


                        </div>
                    </main>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
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
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}
