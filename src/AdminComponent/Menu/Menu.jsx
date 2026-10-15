import React from 'react'
import MenuTable from './MenuTable';
import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const Menu = () => {

  return (
    <div className='px-2'>
        <MenuTable />
    </div>
  );
}

export default Menu;