import { useState, useEffect } from 'react';
import { FormControl, TextField, Typography } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import useLanguage from '../../reusible/useLanguage';

function AgentPost() {

    const { t, i18n } = useLanguage();
    const isRtl = i18n.language === 'ar'; // Check if the language is Arabic

    // modal state
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // data state
    const [fullname, setFullName] = useState("");
    const [description, setDescription] = useState("");
    const [business, setBusiness] = useState("");
    const [phone, setPhone] = useState("");

    const [err, setErr] = useState(false);
    const [errmsg, setErrMsg] = useState(null);

    // toggle button active/disable
    const [activeBtn, setActiveBtn] = useState(false);

    // Validate fields dynamically
    useEffect(() => {
        if (fullname && description && business && phone) {
            setActiveBtn(true);
        } else {
            setActiveBtn(false);
        }
    }, [fullname, description, business, phone]);



    const getToken = () => {
        return Cookies.get('token');
    };



    // Post data
    const handlePost = async () => {
        // Disable button while posting
        setActiveBtn(false);
        const data = { fullname, description, business, phone };


        try {
            const response = await axios.post(
                "https://spiky-crater-dep2vxlep8.ploi.online/api/v1/agents",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );
            setErr(false);
            if (response.data) {
                toast.success('Registered Successfully...');
                setTimeout(() => {
                    handleClose();
                    window.location.reload();
                }, 300); // Close modal after 300ms
                setFullName("");
                setDescription("");
                setBusiness("");
                setPhone("");
            }

        } catch (error) {

            // toast.error('Failed to register agent:', error.response?.data || error.message);
            console.log(error.response?.data.message)
            setErrMsg(error.response?.data.message)
            setErr(true);

        } finally {
            setActiveBtn(true);
        }
    };




    // console.log(errmsg);

    return (
        <>
            <button onClick={handleShow}>
                <AddCircleIcon
                    style={{ fontSize: '55px' }}
                    className="rounded-lg text-[#3A57E8]"
                />
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
                        {t('agent')}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
                        <div className="py-4 container-fluid">
                            <div className="row">
                                <div className="mx-auto col-lg-8 col-md-10">
                                    <Typography
                                        sx={{
                                            fontWeight: 'bold',
                                            marginBottom: '20px',
                                            textAlign: 'center',
                                            fontSize: '22px'
                                        }}
                                    >
                                        {t('agent_p_f')}
                                    </Typography>
                                    <FormControl
                                        variant="standard"
                                        sx={{ margin: 1, width: '100%', gap: '10px' }}
                                    >
                                        <TextField
                                            required
                                            autoComplete="off"
                                            id="fullname"
                                            label="Full Name"
                                            value={fullname}

                                            onChange={(e) => setFullName(e.target.value)}
                                        />
                                        <TextField
                                            required
                                            autoComplete="off"
                                            id="description"
                                            label="Description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                        <TextField
                                            required
                                            autoComplete="off"
                                            id="business"
                                            label="Business"
                                            value={business}
                                            onChange={(e) => setBusiness(e.target.value)}
                                        />
                                        <TextField

                                            required
                                            autoComplete="off"
                                            id="phone"
                                            label="Phone"
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
                                </div>
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
                        onClick={handlePost}
                    >
                       {t('save_changes')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AgentPost;


