
import React, { useEffect } from 'react'

import icon2 from '../assets/img/icon2.png'
import icon3 from '../assets/img/icon3.png'
import icon4 from '../assets/img/icon4.png'
import LanguageIcon from '@mui/icons-material/Language';


// traslation
import i18n from "i18next";

import useLanguage from './useLanguage';


export default function Buttons() {

    const { t } = useLanguage();

    return (
        <>

            <div class="dropdown">
                <a class="btn border-0  dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <LanguageIcon className='text-[#3A57E8]' style={{ fontSize: '30px' }} />
                </a>

                <ul class="dropdown-menu" >
                    <li>
                        <a class="dropdown-item">
                            <button className=""
                                onClick={() => {
                                    i18n.changeLanguage("en");
                                }}
                            >
                                <div className='flex justify-between'>
                                    <img src={icon2} width={'45px'} />
                                    <p className='mt-2 ml-3 text-lg font-normal'>{t('english')}</p>
                                </div>

                            </button>
                        </a>
                    </li>
                    <li>
                        <a class="dropdown-item">
                            <button className=""
                                onClick={() => {
                                    i18n.changeLanguage("so");
                                }}
                            >
                                <div className='flex justify-between'>
                                    <img src={icon3} style={{ width: '45px', height: '33px' }} />
                                    <p className='ml-3 text-lg font-normal'>{t('somali')}</p>
                                </div>
                            </button>
                        </a>
                    </li>
                    <li>
                        <a class="dropdown-item">
                            <button className=""
                                onClick={() => {
                                    i18n.changeLanguage("ar");
                                }}
                            >
                                <div className='flex justify-between'>
                                    <img src={icon4} style={{ width: '45px', height: '33px' }} />
                                    <p className='ml-3 text-lg font-normal'>{t('arabi')}</p>
                                </div>
                            </button>
                        </a>
                    </li>


                </ul>
            </div>
        </>
    )
}
