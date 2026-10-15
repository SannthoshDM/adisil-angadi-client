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

    const handleFilter = (e,value) => {
        setFilterValue(value);
    }

    const disptach = useDispatch();
    const token = localStorage.getItem("jwt");
    const { restaurant, restaurantOrder } = useSelector(store => store);
    
    useEffect(() => {
        disptach(getRestaurantOrder({
            token,
            restaurantId: restaurant.usersRestaurant?.id,
            orderStatus: null
        }))
    },[]);

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
                    <OrderTable item={order} />
                ))
            }
        </Box>
        {/* <OrderTable /> */}
    </div>
  );
}

export default Orders;

//  ORDER TABLE old content

//     const disptach = useDispatch();
//     const token = localStorage.getItem("jwt");
//     const { restaurant, restaurantOrder } = useSelector(store => store);
    
//     useEffect(() => {
//         disptach(getRestaurantOrder({
//             token,
//             restaurantId: restaurant.usersRestaurant?.id,
//             orderStatus: null
//         }))
//     },[]);

//     console.log("INSIDE ORDER TABLE : restaurant :",restaurant);
//     console.log("INSIDE ORDER TABLE : restaurantOrder : ",restaurantOrder);


//   return (
    // <Box>
    //     <Card className='mt-1'>
    //         <CardHeader 
    //             title={"All Orders"}
    //             sx={{ pt:2, alignItems:"center" }}
    //         />
    //         <TableContainer component={Paper}>
    //             <Table sx={{ minWidth: 650 }} aria-label="simple table">
    //                 <TableHead>
    //                     <TableRow>
    //                         <TableCell>ID</TableCell>
    //                         <TableCell align="right">Image</TableCell>
    //                         <TableCell align="right">Customer</TableCell>
    //                         <TableCell align="right">Price</TableCell>
    //                         <TableCell align="right">Name</TableCell>
    //                         <TableCell align="right">Ingredients</TableCell>
    //                         <TableCell align="right">Status</TableCell>
    //                     </TableRow>
    //                 </TableHead>
    //                 <TableBody>
    //                 {
    //                     restaurantOrder?.orders.map((row) => (
    //                         <TableRow
    //                             key={row.id}
    //                             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    //                         >
    //                             <TableCell component="th" scope="row">
    //                                 {1}
    //                             </TableCell>
    //                             <TableCell align="right">{"image"}</TableCell>
    //                             <TableCell align="right">{"subashn@gmail.com"}</TableCell>
    //                             <TableCell align="right">{"499"}</TableCell>
    //                             <TableCell align="right">{"Biriyani"}</TableCell>
    //                             <TableCell align="right">{"Rice"}</TableCell>
    //                             <TableCell align="right">{"PENDING"}</TableCell>
    //                         </TableRow>
    //                     ))
    //                 }
    //                 </TableBody>
    //             </Table>
    //         </TableContainer>
    //     </Card>
    // </Box>
//   );
