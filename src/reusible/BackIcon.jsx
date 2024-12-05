import { Button, IconButton } from '@mui/material'
import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

import useLanguage from './useLanguage';

export default function BackIcon({ pathUrl }) {

  const { t } = useLanguage();

  return (
    <div>
      <Link to={pathUrl}>
        <div className='mb-4 md:mb-0'>
          <Button aria-label="back" variant='contained' sx={{ backgroundColor: '#3A57E8 ' }}>
            <ArrowBackIcon style={{ color: "white" }} />
          <span className='mr-1 text-lg'>  {t('back')}</span>
          </Button>
        </div>
      </Link>
    </div>
  )
}
