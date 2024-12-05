


import React, { useEffect, useState } from 'react';
import {
    Typography, Box, Grid, List, ListItem, ListItemIcon, ListItemText, Toolbar, Avatar, IconButton, Divider, useMediaQuery,
    Button
} from '@mui/material';

import { Home, Paid, Summarize, ArrowBack } from '@mui/icons-material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import img1 from '../assets/img/2.jpg';
import btn1 from '../assets/img/btn.png';
import btn2 from '../assets/img/btn2.png';
import btn3 from '../assets/img/btn3.png';

import homeActive from '../assets/img/Home.png';
import cust from '../assets/img/cust.png';
import category from '../assets/img/Category.png';
import payment from '../assets/img/payment.png';
import order from '../assets/img/order.png';
import users from '../assets/img/Graph.png';
import logout from '../assets/img/Logout.png';
import help from '../assets/img/help.png';

import home from '../assets/img/h.png';
import agent from '../assets/img/b1.png';
import customer from '../assets/img/b2.png';
import product from '../assets/img/b3.png';
import orders from '../assets/img/b4.png';
import users2 from '../assets/img/b5.png';

import Buttons from '../reusible/Buttons';

import useLanguage from '../reusible/useLanguage';


const Sidenav = ({ children }) => {

    // traslation
    const { t, i18n } = useLanguage();


    //state variable that controls whether the sidebar hadu furanyahy ama xiranyahy
    const [isExpanded, setIsExpanded] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    // Media query for small screen
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    // console.log(isSmallScreen); > 600 false
    // will be true if the screen width is less than or equal to 600px, enabling responsive behavior.

    const params = useParams();

    const mainMenuItems = [
        { text: t('dash'), icon: <img src={home} alt="dashboard icon" />, activeIcon: <img src={homeActive} alt="dashboard active icon" />, path: '/dashboard', },
        { text: t('agent'), icon: <img src={cust} alt="agents icon" />, activeIcon: <img src={agent} alt="agents active icon" />, path: '/agents', },
        { text: t('cust'), icon: <img src={category} alt="customers icon" />, activeIcon: <img src={customer} alt="customers active icon" />, path: '/customers' },
        { text: t('product'), icon: <img src={payment} alt="products icon" />, activeIcon: <img src={product} alt="products active icon" />, path: '/products' },
        { text: t('user'), icon: <img src={users} alt="users icon" />, activeIcon: <img src={users2} alt="users active icon" />, path: '/users' },
        { text: t('order'), icon: <img src={order} alt="orders icon" />, activeIcon: <img src={orders} alt="orders active icon" />, path: '/orders' },
    ];

    const bottomMenuItems = [
        { text: t('singout'), icon: <img src={logout} alt="logout icon" />, path: '/signout' },
        { text: t('help'), icon: <img src={help} alt="help icon" />, path: '/help' }
    ];

    useEffect(() => {
        if (isSmallScreen) {
            setIsExpanded(false); // Automatically collapse sidebar on small screens

        } else {
            setIsExpanded(true); // Expand sidebar on larger screens
        }
    }, [isSmallScreen]);




    return (
        <Grid container className="bg-[#f9f9f9] overflow-hidden h-[100vh]">
            {/* Sidebar Section */}
            <Grid
                item
                // xs: 0px, sm: 600px, md: 900px, lg: 1200px, xl: 1536px
                xs={isSmallScreen ? 2 : 3}
                sm={isExpanded ? 3 : 1}
                md={isExpanded ? 2 : 1}
                className="transition-all duration-300 bg-white"
                style={{
                    transition: 'width 0.3s ease',
                    overflow: 'hidden',
                    height: isSmallScreen ? 'auto' : '100vh',
                }}
            >


                <Box className='flex flex-col items-center mt-10'>
                    {isExpanded && (
                        <>
                            <Typography sx={{ fontWeight: 'bold', color: '#232D42', textAlign: 'center' }}>
                                {t('com_system')}
                            </Typography>
                            <Avatar src={img1} alt="Profile" className="mt-2 border-2 border-indigo-300 w-15 h-15" />
                            <Typography variant="body1" className="mt-1">{t('name')}</Typography>
                            <Typography color="text.secondary" variant="body2" className="text-gray-500">{t('title')}</Typography>
                            <Box className="flex justify-center gap-2 mt-2">
                                <img src={btn1} alt="social" />
                                <img src={btn2} alt="social" />
                                <img src={btn3} alt="social" />
                            </Box>
                        </>
                    )}
                    <Divider className="my-1 mt-3" />
                </Box>
                <List>
                    {mainMenuItems.map((item) => (
                        <li key={item.text}>
                            <ListItem
                                button
                                className={`hover:bg-gray-200 ${location.pathname === item.path ? 'text-blue-600' : 'text-gray-500'}`}
                                onClick={() => {
                                    navigate(item.path);
                                }}
                                style={{
                                    direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
                                }}
                            >
                                <ListItemIcon
                                    style={{
                                        minWidth: i18n.language === 'ar' ? 'auto' : '40px',
                                        marginInlineEnd: i18n.language === 'ar' ? '8px' : '0',
                                    }}
                                >
                                    {location.pathname === item.path ? item.activeIcon : item.icon}
                                </ListItemIcon>
                                {isExpanded &&
                                    <ListItemText
                                        primary={item.text}
                                        style={{
                                            textAlign: i18n.language === 'ar' ? 'right' : 'left',
                                        }}
                                    />
                                }
                            </ListItem>
                        </li>
                    ))}
                    <Divider sx={{ borderColor: 'blue' }} />
                    {bottomMenuItems.map(item => (
                        <ListItem
                            key={item.text}
                            button
                            onClick={() => navigate(item.path)}
                            className={`hover:bg-gray-200 ${location.pathname === item.path ? 'text-blue-600' : 'text-gray-500'}`}
                            style={{
                                direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
                            }}
                        >
                            <ListItemIcon
                                style={{
                                    minWidth: i18n.language === 'ar' ? 'auto' : '40px',
                                    marginInlineEnd: i18n.language === 'ar' ? '8px' : '0',
                                }}
                            >
                                {location.pathname === item.path ? item.activeIcon : item.icon}
                            </ListItemIcon>
                            {isExpanded &&
                                < ListItemText
                                    style={{
                                        textAlign: i18n.language === 'ar' ? 'right' : 'left',
                                    }}
                                    primary={item.text} />
                            }
                        </ListItem>
                    ))}
                </List>
            </Grid >

            {/* Toolbar and Main Content Section */}
            < Grid
                item
                xs={isSmallScreen ? 10 : 12 - (isExpanded ? 3 : 1)}
                sm={isExpanded ? 9 : 11}
                md={isExpanded ? 10 : 11}
                sx={{ display: 'flex', flexDirection: 'column', transition: 'margin-left 0.3s ease' }}
            >

                <div className="flex flex-col flex-1">
                    <div
                        className={`z-20 bg-white ${i18n.language === 'ar' ? 'mr-6' : 'ml-6'}`}
                        style={{
                            position: 'sticky',
                            top: 0, // Optional: To ensure it sticks to the top of the viewport
                        }}
                    >
                        <Toolbar className="flex items-center justify-between px-4">
                            <div className="flex items-center">


                                {/* Conditionally render the collapse button only on large screens */}
                                {!isSmallScreen && (
                                    i18n.language == 'ar' ? (
                                        <Box
                                            style={{
                                                position: 'absolute',
                                                top: i18n.language == 'ar' ? '10px' : '20px',
                                                marginBottom: '20px',
                                                // left: '101%'
                                                left: isExpanded ? '101%' : '107%'
                                            }}
                                        >
                                            <IconButton
                                                className="w-10 h-10 mb-10 rounded-full"
                                                sx={{
                                                    backgroundColor: '#0048B2', color: 'white',
                                                }}
                                                onClick={() => setIsExpanded((prev) => !prev)}
                                            >
                                                <ArrowForwardIcon />
                                            </IconButton>
                                        </Box>
                                    ) :
                                        (
                                            <Box
                                                style={{
                                                    position: 'absolute',
                                                    top: i18n.language == 'ar' ? '10px' : '5px',
                                                    marginBottom: '20px',
                                                    // right: '101%'
                                                    right: isExpanded ? '101%' : '107%'
                                                }}
                                            >
                                                <IconButton
                                                    className="w-10 h-10 mb-10 rounded-full"
                                                    sx={{ backgroundColor: '#0048B2', color: 'white' }}
                                                    onClick={() => setIsExpanded((prev) => !prev)}
                                                >
                                                    <ArrowBack />
                                                </IconButton>
                                            </Box>
                                        )




                                )}


                                <Typography variant="h6" className="ml-4 text-black lg:block">
                                    {mainMenuItems.map((item) => (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'gray' }}>
                                            {location.pathname === item.path && (
                                                <>
                                                    {item.icon && <span>{item.activeIcon}</span>}
                                                    {item.text && <span>{item.text}</span>}
                                                </>
                                            )}
                                        </div>

                                    ))}
                                </Typography>
                            </div>
                            <div className="flex items-center ">
                                <Typography sx={{ fontSize: '20px' }}>{i18n.language}</Typography>
                                <div className="flex items-center ">
                                    <div>
                                        <Buttons />
                                    </div>
                                    <Typography variant="body1" className="hidden text-black lg:block font">
                                        {t('name')}
                                    </Typography>
                                    <img src={img1} alt="User" className={` ${i18n.language === 'ar' ? 'mr-5' : 'ml-5'}   w-8 h-8 rounded-full`} 
                                    
                                    />
                                </div>
                            </div>
                        </Toolbar>
                    </div>
                </div >

                <Box sx={{ padding: 3, backgroundColor: '#f9f9f9', height: 'calc(100vh - 64px)', overflowY: 'auto' }}>
                    <main>{children}</main>
                </Box>
            </Grid >
        </Grid >

    );
};

export default Sidenav;