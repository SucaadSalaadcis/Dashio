import { useEffect, useState } from 'react'


import { FormControl, TextField, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import axios from 'axios';
import toast from 'react-hot-toast';

import AddCircleIcon from '@mui/icons-material/AddCircle';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ProductPost() {


    // modal state
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [commission, setCommission] = useState("");

    const [err, setErr] = useState(false);
    const [errmsgCo, setErrMsgCo] = useState(null);
    const [errmsgPri, setErrMsgPri] = useState(null);

    // toggle button active/disable
    const [activeBtn, setActiveBtn] = useState(false);


    // Validate fields dynamically
    useEffect(() => {
        if (name && price && commission) {
            setActiveBtn(true);
        } else {
            setActiveBtn(false);
        }
    }, [name, price, commission]);



    const getToken = () => {
        return Cookies.get('token');
    };


    // post
    const handlePost = async () => {
        // e.preventDefault();
        setActiveBtn(false);

        const data = {
            name, price, commission
        }


        const response = await axios.post("https://spiky-crater-dep2vxlep8.ploi.online/api/v1/products", data, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then((response) => {
            setErr(false);
            if (response.data) {
                toast.success('Registered Successfuly...');
                setTimeout(() => {
                    handleClose();
                }, 300);
            }
            window.location.reload(1);

            setName("");
            setPrice("");
            setCommission("");

        }).catch((error) => {

            console.log(error.response?.data.errors.name)
            setNameError(error.response?.data.errors.name);
            setErrMsgCo(error.response?.data.errors.commission);
            setErrMsgPri(error.response?.data.errors.price);
            setErr(true);

        }).finally(_ => {
            setActiveBtn(true); // Re-enable after request is complete
        })
    }


    const [nameError, setNameError] = useState(null);

    const validateName = () => {
        if (!name) {
            setNameError(true);
            setErr(true);
        } else {
            setNameError(false);
        }
    }



    return (

        <>
            <button onClick={handleShow} >
                <AddCircleIcon style={{ fontSize: '55px' }} className='rounded-lg text-[#3A57E8]' />
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Products</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">

                        <div class="container-fluid py-4">
                            <div class="row">
                                <div class="col-lg-8 col-md-10 mx-auto">

                                    {/* content page */}
                                    <Typography sx={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>Product Post Form</Typography>
                                    <FormControl variant="standard" sx={{ margin: 1, width: "100%", gap: '10px' }} >
                                        <TextField
                                            required
                                            autoComplete="off"
                                            id="name-field"
                                            label="Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: nameError ? 'red' : '', // Set red border if there's an error
                                                    },
                                                },
                                            }}
                                        />
                                        {
                                            err ? (
                                                <span className='text-red-600'>{nameError}</span>
                                            ) : ''
                                        }
                                        <TextField
                                            required
                                            autoComplete="off"
                                            id="price-field"
                                            label="Price"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: errmsgPri ? 'red' : '', // Set red border if there's an error
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
                                            autoComplete="off"
                                            id="commission-field"
                                            label="Commission"
                                            value={commission}
                                            onChange={(e) => setCommission(e.target.value)}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: errmsgCo ? 'red' : '', // Set red border if there's an error
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

                                </div>
                            </div>
                        </div>
                    </main>

                </Modal.Body >
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
            </Modal >
        </>


    )
}
