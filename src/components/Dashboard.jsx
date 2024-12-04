
import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';


import LineChart from '../charts/LineChart';

import useLanguage from '../reusible/useLanguage';

export default function Dashboard() {


  const { t } = useLanguage();


  return (
    <>

      <div className="flex flex-wrap items-center justify-between gap-2 mx-5 my-5 md:gap-0 md:flex-nowrap">
        <Typography variant="div" className="w-full sm:w-auto text-[#3A57E8] text-lg md:text-2xl font-semibold font-[Inter]">
          <p className="m-0 text-sm sm:text-base md:text-2xl">{t('dash')}</p> {/* Removed margin */}
        </Typography>

        <p className="flex items-center w-full m-0 transition-all duration-300 sm:text-base md:w-auto">
          <span className="overflow-hidden md:text-[20px] text-sm text-[#3A57E8] text-ellipsis line-clamp-2 hover:line-clamp-none">
            {t('last_thirty_day')}
          </span>
        </p>
      </div>




      <Grid
        container
        spacing={2}
        sx={{ marginTop: '40px' }}
        justifyContent='flex-start'
        alignItems='stretch'
      >

        <Grid container spacing={3} sx={{ marginTop: '10px', marginLeft: '20px' }} justifyContent="flex-start" alignItems="stretch">
          {[
            { label: t('agency'), value: t('num1') },
            { label: t('cust'), value: t('num2') },
            { label: t('product'), value: t('num3') },
            { label: t('order'), value: t('num4') },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}> {/* Adjusting grid item sizes */}
              <Box
                sx={{
                  backgroundColor: '#FFFFFF',
                  height: '120px',  // Increased height of the card
                  padding: '20px',  // Increased padding for a larger feel
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography
                    style={{
                      color: '#8A92A6',
                      fontWeight: '400',
                      fontSize: '14px',  // Increased font size for "Hide"
                      fontFamily: 'Inter',
                    }}
                  >
                    {t('hide')}
                  </Typography>
                  <span
                    style={{
                      color: '#3A57E8',
                      backgroundColor: '#EBEEFD',
                      padding: '4px 10px',  // Adjusted padding for the span
                      borderRadius: '20px',
                      fontSize: '14px',  // Increased font size for "Yearly"
                      fontFamily: 'Inter',
                    }}
                  >
                    {t('year')}
                  </span>
                </Box>

                <Typography
                  variant=""
                  style={{
                    color: '#232D42',
                    fontWeight: '500',
                    fontSize: '24px',  // Increased font size for value
                    fontFamily: 'Inter',
                  }}
                >
                  {item.value}
                </Typography>

                <Typography
                  style={{
                    color: '#8A92A6',
                    fontWeight: '400',
                    fontSize: '16px',  // Increased font size for label
                    fontFamily: 'Inter',
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>


        {/* Line Chart Section */}
        <Grid item xs={12}>
          <div className='mb-40  ml-[25px] mt-10'>
            <LineChart />
          </div>
        </Grid>

        {/* Footer Section */}
        <Grid item xs={12}>
          <div className="flex flex-wrap items-center justify-between w-full h-auto px-4 py-2 text-center text-black bg-white">
            <Typography className="font-[Inter] text-xs md:text-sm font-normal">
              {t('privacy')} ,
              <span className="ml-5 font-[Inter] text-sm md:text-base font-normal">
                {t('terms')}
              </span>
            </Typography>
            <Typography className="font-[Inter] text-xs md:text-sm font-normal">
              {t('cawale')}
            </Typography>
          </div>
        </Grid>



      </Grid>
    </>
  );
}
