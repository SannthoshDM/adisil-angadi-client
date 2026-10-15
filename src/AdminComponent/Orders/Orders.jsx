import { Box, Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import OrderTable from './OrderTable'
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantOrder } from '../../components/State/RestaurantOrder/RestaurantOrderAction';


const orderStatus = [
    {
        label: "Pending",
        value: "PENDING"
    },
    {
        label: "Out_for_delivery",
        value: "OUT_FOR_DELIVERY"
    },
    {
        label: "Delivered",
        value: "DELIVERED"
    },
    {
        label: "Completed",
        value: "COMPLETED"
    },
    {
        label: "All",
        value: "ALL"
    },

]


const Orders = () => {

    const [filterValue,setFilterValue] = useState();

    const disptach = useDispatch();
    const token = localStorage.getItem("jwt");
    const { restaurant, restaurantOrder } = useSelector(store => store);

    const handleFilter = (e,value) => {
        console.log("GET ORDERS for Order Status : ",value);
        setFilterValue(value);

        if(value === "ALL")
        {
            value= null;
        }

        disptach(getRestaurantOrder({
            token,
            restaurantId: restaurant.usersRestaurant?.id,
            orderStatus: value
        }));
    }
    
    // useEffect(() => {
    //     disptach(getRestaurantOrder({
    //         token,
    //         restaurantId: restaurant.usersRestaurant?.id,
    //         orderStatus: null
    //     }))
    // },[]);

    console.log("INSIDE ADMIN ORDER : restaurant :",restaurant);
    console.log("INSIDE ADMIN ORDER : restaurantOrder : ",restaurantOrder);


  return (
    <div className='px-2'>
        <Card className='p-5'>
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
        </Card>
        <Box sx={{ padding: 2}}>
            {
                restaurantOrder?.orders.map((order) => (
                    <OrderTable key={order.id} item={order} />
                ))
            }
        </Box>
    </div>
  );
}

export default Orders;
