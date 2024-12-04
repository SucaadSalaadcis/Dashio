import React, { useState } from 'react';
import { TextField, Button, Checkbox, Typography, Box, Grid } from '@mui/material';


import half_logo from '../assets/img/Logo.png'
import SocialLinks from '../assets/img/Social_Links.png'
import Logo_icon from '../assets/img/Logo_icon.png'

import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

const SignIn = () => {



    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSumbit = async (e) => {

        e.preventDefault();
        try {
            if (email == '' && password == '') {
                toast.success("All Fields are required")
            }
            const user_data = await axios.post('https://spiky-crater-dep2vxlep8.ploi.online/api/auth/login',
                { email, password }, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then((user_data) => {
                // ku store garey token in cookie 
                Cookies.set('token', user_data.data.token, { expires: 7, });
                // localStorage.setItem('token',user_data.data.token);

                // toast.success('Login successful',)
                window.location.href = 'dashboard';
            })

            console.log('Login successful:', user_data.data);

            // Redirect user to dashboard
        } catch (error) {
            console.error('Error user_data:', error.response);
        }

    }


    return (
        <Grid container sx={{ minHeight: "100vh", backgroundColor: '#f9f9f9' }}>

            {/* Left Section */}
            <Grid
                item
                xs={12}
                md={6}
                sx={{

                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    position: "relative",
                    overflow: "hidden",

                }}
            >
                {/* Large Half-Circle Background */}
                {/* last */}
                <Box
                    sx={{
                        position: "absolute",
                        width: 800,
                        height: 800,
                        borderRadius: "50%",
                        bgcolor: "#f1f3fa",
                        top: "50%",
                        left: "-18%",
                        transform: "translateY(-50%)",
                    }}

                />
                {/* second */}
                <Box
                    sx={{
                        position: "absolute",
                        width: 800,
                        height: 800,
                        borderRadius: "50%",
                        bgcolor: "#3a57e8",
                        top: "50%",
                        left: "-29.7%",
                        transform: "translateY(-50%)",
                    }}
                >
                </Box>
                {/* first */}
                <Box
                    sx={{
                        position: "absolute",
                        width: 800,
                        height: 800,
                        borderRadius: "50%",
                        bgcolor: "#EBEEFD",
                        top: "50%",
                        left: "-30%",
                        transform: "translateY(-50%)",
                    }}
                >
                </Box>

                {/* the top thing like title and icon */}
                <div>
                    <Button
                        disableRipple
                        startIcon={<img width={'20px'} src={Logo_icon} />}
                        size="large"
                        sx={{
                            position: 'absolute',
                            top: '10%',
                            left: '20%',
                            transform: 'translate(-50%, -50%)',
                            // color: 'black',
                            fontSize: '33px',
                            textTransform: 'none',
                            fontWeight: '500',
                            color: '#232D42',
                            fontFamily: 'Inter',
                            lineHeight: '42.9px',
                            backgroundColor: 'transparent',
                            MuiButtonBase: { disableRipple: true }
                        }}
                    >
                        <span style={{ marginLeft: '10px' }}>  Hope UI</span>
                    </Button>
                    <img src={half_logo} style={{
                        zIndex: '1', /* set higher z-index value */
                        position: 'relative', /* position must be set for z-index to work */
                        height: '500px',
                        paddingTop: '80px'
                    }} alt="empty" />
                </div>


            </Grid>

            {/* Right Section */}
            <Grid item xs={12} md={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                <Box
                    sx={{

                        width: '70%',
                        maxWidth: '400px',
                        padding: '20px 30px 20px 30px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                    }}
                >
                    <Typography variant="h5" component="div" color='#232D42'
                        style={{
                            textAlign: 'center',
                            fontFamily: 'Inter',
                            fontWeight: '500',
                            fontSize: '33px',
                            lineHeight: '42.9px',
                            marginTop: '5px'
                        }}>
                        Sign In
                    </Typography>
                    <Typography color="#232D42"
                        style={{
                            textAlign: 'center',
                            fontFamily: 'Inter',
                            fontWeight: '400',
                            fontSize: '16px',
                            lineHeight: '28px',
                            marginTop: '4px'
                        }}>
                        Sign in to stay connected.
                    </Typography>

                    {/* Email Field */}
                    <div
                        style={{
                            fontFamily: 'Inter',
                            fontWeight: '400',
                            fontSize: '16px',
                            lineHeight: '28px',
                            marginTop: '10px'
                        }}>

                        <label style={{ color: '#232D42', }}> Email</label>

                        <TextField fullWidth variant="outlined" margin='dense' type="email"
                            sx={{
                                "& fieldset": { border: 'none' },
                            }}
                            style={{
                                backgroundColor: '#F9F9F9',
                                border: 'none',
                                borderRadius: '5%',
                            }}
                            placeholder="xyz@example.com"
                            onChange={(e) => setEmail(e.target.value)}

                        />

                    </div>

                    {/* Password Field */}
                    <div
                        style={{
                            color: 'red',
                            fontFamily: 'Inter',
                            fontWeight: '400',
                            fontSize: '16px',
                            lineHeight: '28px'

                        }}>

                    </div>
                    <label style={{ color: '#232D42', }}> Password</label>
                    <TextField fullWidth variant="outlined" margin='dense' sx={{
                        "& fieldset": { border: 'none' },
                    }}
                        style={{
                            backgroundColor: '#F9F9F9',
                            border: 'none',
                            borderRadius: '5%',
                        }} type="password" placeholder="xxxx"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* Remember Me Checkbox and Forgot Password Link */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Checkbox color="primary" />
                            <Typography variant="body2" color='#001F4D'
                                style={{
                                    fontFamily: 'Inter',
                                    fontWeight: '400',
                                    fontSize: '16px',
                                    lineHeight: '28px'
                                }}>Remember me?</Typography>
                        </Box>
                        <Link href="#" variant="body2" underline="none" color='#3A57E8'
                            style={{
                                fontFamily: 'Inter',
                                fontWeight: '400',
                                fontSize: '16px',
                                lineHeight: '28px'
                            }}>
                            Forgot Password
                        </Link>
                    </Box>

                    {/* Sign In Button */}
                    <Button size="medium" variant='contained'
                        onClick={handleSumbit}
                        sx={{
                            mt: '10px',
                            textTransform: 'none',
                            marginLeft: '120px',
                            backgroundColor: '#3A57E8',
                            color: '#FFFFFF',
                            fontFamily: 'Inter',
                            fontWeight: '400',
                            fontSize: '16px',
                            lineHeight: '28px'
                        }}>Sign In</Button>

                    {/* Divider */}
                    <Typography
                        variant="body2"
                        align="center"
                        color="#232D42"
                        sx={{
                            margin: '16px 0',
                            fontFamily: 'Inter',
                            fontWeight: '400',
                            fontSize: '16px',
                            lineHeight: '28px'
                        }}
                    >
                        or sign in with other accounts?
                    </Typography>

                    {/* Social Media Icons */}
                    <Box
                        style={{ gap: '8px', display: 'flex', justifyContent: 'center' }}>
                        <img src={SocialLinks} alt="empty" />
                    </Box>

                    {/* Sign Up Link */}
                    <Typography sx={{
                        color: '#232D42',
                        fontFamily: 'Inter',
                        fontWeight: '400',
                        fontSize: '14px',
                        lineHeight: '24px',
                        textAlign: 'center'
                    }}>
                        Don’t have an account?{' '}
                        <Link to='/signup' style={{ textDecoration: 'none' }}>
                            <span style={{
                                color: '#3A57E8',
                                fontWeight: '400',

                            }}> Click here to sign up.</span>
                        </Link>
                    </Typography>
                </Box>
            </Grid>

        </Grid >
    );
};

export default SignIn;
