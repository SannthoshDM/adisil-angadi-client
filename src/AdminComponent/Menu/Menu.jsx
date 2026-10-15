import React from 'react'
import MenuTable from './MenuTable';
import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const Menu = () => {

  return (
    <div className='px-2'>
        {/* <Card className='p-5'>
            <Typography sx={{ paddingBottom:"1rem" }} variant='h5' >
                Order Status
            </Typography>
            <FormControl>
                <RadioGroup onChange={handleFilter} row name='category' value={filterValue || "ALL"}>
                    {
                        orderStatus.map((item) => <FormControlLabel
                        key={item.label}
                        value={item.value}
                        control={<Radio />}
                        label={item.label}
                        sx={{color:"gray"}} />)
                    }
                </RadioGroup>
            </FormControl>
        </Card> */}
        <MenuTable />
    </div>
  );
}

export default Menu;