import { Avatar, Box, Button, Card, CardActions, CardHeader, Chip, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect } from 'react'
import Paper from '@mui/material/Paper';
import { Create, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsOfRestaurant } from '../../components/State/Ingredients/IngredientsAction';
import { deleteFoodAction, getMenuItemsByRestaurantId, updateMenuItemsAvailability } from '../../components/State/Menu/MenuAction';




const MenuTable = () => {

    const navigate = useNavigate();
    const { restaurant, ingredients, menu } = useSelector(store => store);
    const dispatch = useDispatch();
    const token = localStorage.getItem("jwt");

    console.log("INSIDE MENU TABLE : restaurant :",restaurant);
    console.log("INSIDE MENU TABLE : ingredients : ",ingredients);
    console.log("INSIDE MENU TABLE : menu : ",menu);

    useEffect(() => {
        if(ingredients?.ingredients.length === 0)
        {
            console.log("IN MENU ingredients value is empty so ingredients api is called ....");
            dispatch(getIngredientsOfRestaurant({
                token,
                restaurantId: restaurant.usersRestaurant?.id
            }))
        }

        dispatch(getMenuItemsByRestaurantId({
            token,
            restaurantId: restaurant.usersRestaurant?.id
        }))
    },[]);

    const handleDeleteFood = (foodId) => {
        console.log("INSIDE MENU TABLE : delete food :",foodId);
        dispatch(deleteFoodAction({foodId, token}));
    }

    const handleUpdateStock = (foodId) => {
        console.log("INSIDE UPDATE FOOD AVAILABILTY for the foodid : ",foodId);

        dispatch(updateMenuItemsAvailability({foodId,token}));
    }


  return (
    <Box>
        <Card className='mt-1'>
            <CardHeader 
                action={
                    <Button 
                        variant="contained" 
                        endIcon={<Create />}
                        onClick={() => navigate("/admin/restaurant/add-menu")}
                    >
                        Create Food
                    </Button>
                }
                title={"Menu"}
                sx={{ pt:2, alignItems:"center" }}
            />
            <CardActions 

            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, alignItems: "center" }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Image</TableCell>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">Ingredients</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Availability</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        menu?.menuItems?.map((item) => (
                            <TableRow
                                key={item.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Avatar sx={{ width: 56, height: 56 }} src={item.images[0]}>
                                    </Avatar>
                                </TableCell>
                                <TableCell align="right">{item.name}</TableCell>
                                <TableCell align="right">
                                    {
                                        item.ingredients.map((ingredient) => (
                                            <Chip className='p-2' key={ingredient.id} label={ingredient.name}/>
                                        ))
                                    }
                                </TableCell>
                                <TableCell align="right">₹{item.price}</TableCell>
                                {/* <TableCell align="right">{item.available ? "In stock" : "Out of Stock"}</TableCell> */}
                                <TableCell align='right'>
                                    <Button 
                                        onClick={() => handleUpdateStock(item.id)} 
                                        variant='contained'
                                        className='py-[1rem] px-[2rem]'
                                        color={ item.available ? "success" : "error"}
                                    >
                                        {
                                            item.available ? "In Stock" : "Out of Stock"
                                        }
                                    </Button> 
                                </TableCell>
                                <TableCell align="right">
                                    {
                                        <IconButton sx={{ color:"red" }} onClick={() => handleDeleteFood(item.id)}>
                                            <Delete />
                                        </IconButton>
                                    }
                                </TableCell>
                            </TableRow>
                        ))
                    }
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    </Box>
  );
}

export default MenuTable;