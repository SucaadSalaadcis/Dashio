import { Button, IconButton } from '@mui/material'
import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

export default function BackIcon({ pathUrl }) {
  return (
    <div>
      <Link to={pathUrl}>
        <div className='mb-4 md:mb-0'>
          <Button aria-label="back" variant='contained' sx={{ backgroundColor: '#3A57E8 ' }}>
            <ArrowBackIcon style={{ color: "white" }} />
            Back
          </Button>
        </div>
      </Link>
    </div>
  )
}
