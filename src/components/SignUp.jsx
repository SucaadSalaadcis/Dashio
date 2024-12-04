import React from "react";
import { Box, Button, Checkbox, FormControl, Grid, TextField, Typography } from "@mui/material";


import half_logo from '../assets/img/Logo.png'
import SocialLinks from '../assets/img/Social_Links.png'
import Logo_icon from '../assets/img/Logo_icon.png'
import { Link } from "react-router-dom";


const SignUp = () => {
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
      <Grid item xs={12} md={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '30px' }}>
        <Box
          sx={{
            width: '70%',
            maxWidth: '400px',
            padding: '4px 30px',
            backgroundColor: 'white',
            borderRadius: '8px',

          }}
        >
          <Box>
            {/* Title */}
            <Typography variant="h5" component="div" color='#232D42'
              style={{
                textAlign: 'center',
                fontFamily: 'Inter',
                fontWeight: '500',
                fontSize: '33px',
                lineHeight: '42.9px',
                marginTop: '5px'
              }}>
              Sign Up
            </Typography>

            <Typography color='#232D42'
              sx={{
                fontFamily: 'Inter',
                fontWeight: '400',
                fontSize: '14px',
                lineHeight: '24px',
                textAlign: 'center',
                marginTop: '4px'
              }}>
              Create your Hope UI account
            </Typography>

            {/* First text field */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                fontFamily: 'Inter',
                fontWeight: '400',
                fontSize: '14px',
                lineHeight: '24px',
                marginTop: '10px'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <label style={{ color: '#232D42' }}>First Name</label>
                <TextField size="small" variant="outlined" type='text' margin='dense' placeholder='John'

                  sx={{
                    "& fieldset": { border: 'none' },
                  }}
                  style={{
                    backgroundColor: '#F9F9F9',
                    border: 'none',
                    borderRadius: '5%',
                  }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <label style={{ color: '#232D42' }}>Last Name</label>
                <TextField size="small" variant="outlined" type='text' margin='dense' placeholder='Doe'
                  sx={{
                    "& fieldset": { border: 'none' },
                  }}
                  style={{
                    backgroundColor: '#F9F9F9',
                    border: 'none',
                    borderRadius: '5%'
                  }}
                />

              </div>
            </div>

            {/* Second text field */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                fontFamily: 'Inter',
                fontWeight: '400',
                fontSize: '14px',
                lineHeight: '24px',
                marginTop: '5px'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <label style={{ color: '#232D42' }}>Email</label>
                <TextField size="small" variant="outlined" margin="dense" type="email" placeholder="xyz@example.com"
                  sx={{
                    "& fieldset": { border: 'none' },
                  }}
                  style={{
                    backgroundColor: '#F9F9F9',
                    border: 'none',
                    borderRadius: '5%'
                  }}
                />

              </div>

              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <label style={{ color: '#232D42' }}>Phone</label>
                <TextField size="small" variant="outlined" type="number" margin="dense" placeholder="123456789"
                  sx={{
                    "& fieldset": { border: 'none' },
                  }}
                  style={{
                    backgroundColor: '#F9F9F9',
                    border: 'none',
                    borderRadius: '5%'
                  }}
                />

              </div>
            </div>

            {/* Third text field */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                fontFamily: 'Inter',
                fontWeight: '400',
                fontSize: '14px',
                lineHeight: '24px',
                marginTop: '5px'
              }}>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <label style={{ color: '#232D42' }}>Password</label>
                <TextField size="small" variant="outlined" margin='dense' placeholder='xxxxx'
                  sx={{
                    "& fieldset": { border: 'none' },
                  }}
                  style={{
                    backgroundColor: '#F9F9F9',
                    border: 'none',
                    borderRadius: '5%'
                  }}
                />

              </div>

              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, }}>
                <label style={{ color: '#232D42' }}>Confirm Password</label>
                <TextField size="small" variant="outlined" margin='dense' placeholder='xxxxx'
                  sx={{
                    "& fieldset": { border: 'none' },
                  }}
                  style={{
                    backgroundColor: '#F9F9F9',
                    border: 'none',
                    borderRadius: '5%'
                  }}
                />

              </div>
            </div>
            {/* check box */}
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
              <Checkbox color="primary" />
              I agree with the terms of use
            </Typography>

            {/* Sign Up button */}
            <Button size="medium" variant='contained' sx={{
              textTransform: 'none',
              marginLeft: '125.3px',
              backgroundColor: '#3A57E8',
              color: '#FFFFFF',
              fontFamily: 'Inter',
              fontWeight: '400',
              fontSize: '16px',
              lineHeight: '28px'
            }}>
              Sign Up
            </Button>

            {/* Alternate sign-up options */}
            <Typography
              variant="body2"
              align="center"
              color="#232D42"
              sx={{
                margin: '12px 0',
                fontFamily: 'Inter',
                fontWeight: '400',
                fontSize: '14px',
                lineHeight: '24px',
              }}>
              or sign up with other accounts?
            </Typography>
            <Box style={{ gap: '8px', display: 'flex', justifyContent: 'center' }}>
              <img src={SocialLinks} alt="empty" />
            </Box>

            {/* Sign in link */}
            <Typography sx={{
              color: '#232D42',
              fontFamily: 'Inter',
              fontWeight: '400',
              fontSize: '14px',
              lineHeight: '24px',
              textAlign: 'center'
            }}>
              Already have an Account
              <Link to={'/'} style={{ textDecoration: 'none' }}>
                <span style={{
                  color: '#3A57E8',
                  fontWeight: '400',
                }}> Sign in</span>
              </Link>
            </Typography>
          </Box>
        </Box>
      </Grid>

    </Grid >
  );
};

export default SignUp;
