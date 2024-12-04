
import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);


import { Autocomplete, Button, TextField } from '@mui/material';


const selectData = ['Year', 'Day', 'Month']


// traslation
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import cookies from "js-cookie";


i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    fallbackLng: "en",
    detection: {
      // order and from where user language should be detected
      order: ['cookie', 'htmlTag', 'localStorage', 'sessionStorage', 'navigator', 'path', 'subdomain'],
      caches: ['cookie'], // save the language in the browser
    },
    backend: {
      loadPath: '/locale/{{lng}}/translation.json',
    }
  });



const LineChart = () => {




  const { t } = useTranslation();

  const lng = cookies.get('i18next') || 'en';


  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [lng]);


  // Data for the chart
  const data = {

    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', '', ''],

    datasets: [
      {
        label: '',
        data: [1000, 1200, 2500, 3000, 5000, null, null, null, null, null],
        borderColor: 'blue',
        backgroundColor: 'transparent',
        pointBackgroundColor: 'white',
        pointBorderColor: 'blue',
        pointRadius: 5,
        tension: 0.4,
      },
      {
        label: '',
        data: [null, null, null, null, 5000, 3000, 2000, 2500, 2700, 2900],
        borderColor: 'blue',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: { label: (context) => `${context.raw} Users` },
        backgroundColor: '#333',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'blue',
        borderWidth: 1,
      },
    },
    layout: { padding: 0 },
    scales: {
      y: {
        beginAtZero: true,
        max: 6000,
        ticks: {
          // stepSize: 1000,
          callback: (value) => `${value / 1000}k`,
        },
        grid: {
          color: '#ADB5BD',
          lineWidth: 1,
        },
        border: {
          dash: [5, 10]
        }
      },
      x: {
        grid: { display: true },
        border: {
          dash: [5, 10]
        },
        ticks: { maxRotation: 0 },
      },
    },
  };


  return (
    <>
      <div className="w-full px-5 pt-2 pb-5 overflow-hidden bg-white ">
        <div className="flex flex-col items-center mt-3 sm:flex-row sm:justify-between">
          {/* Users text on the left on larger screens */}
          <h6 className="w-full text-xl text-center sm:w-auto sm:text-left sm:ml-4">
            {t('user')}
          </h6>

          {/* Sort by label and Autocomplete input */}
          <div className="flex items-center w-full mt-2 sm:w-auto sm:justify-end sm:mt-0 sm:ml-4">
            {/* Sort by label */}
            <span className="text-[#ADB5BD] sm:text-left text-center">
              {t('sort')}:
            </span>

            {/* Autocomplete Input */}
            <Autocomplete
              className="w-full ml-2 sm:w-auto"
              disablePortal
              options={selectData}
              sx={{ width: 160 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  placeholder="Month"
                  color="white"
                  sx={{
                    background: '#627ef7',
                    '& .MuiFilledInput-root': {
                      color: 'white', // Text inside the input will be white
                    },
                  }}
                />
              )}
            />
          </div>
        </div>

        {/* Line Chart */}
        <div className="w-full h-full mt-2">
          <Line data={data} options={options} className="w-full h-full" />
        </div>
      </div>

    </>
  );
};

export default LineChart;
