import { Box, Button, Card, CardActions, CardHeader, IconButton, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect } from 'react'
import Paper from '@mui/material/Paper';
import { Create, Delete } from '@mui/icons-material';
import CreateIngredientForm from './CreateIngredientForm';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsOfRestaurant, updateStockOfIngredient } from '../../components/State/Ingredients/IngredientsAction';


const orders = [1,1,1,1,1,1,1,1,1];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const IngredientsTable = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { restaurant, ingredients } = useSelector(store => store);
    const token = localStorage.getItem("jwt");
  
    const dispatch = useDispatch();
  
    console.log("INSIDE INGREDIENTS  TABE : restaurant : ",restaurant);
    console.log("INSIDE INGREDIENTS TABLE : ingredients.ingredients : ",ingredients?.ingredients);
  
    useEffect(() => {
      dispatch(getIngredientsOfRestaurant({
          token,
          restaurantId: restaurant.usersRestaurant?.id
      }))
    },[]);

    const handleUpdateStock = (id) => {
        dispatch(updateStockOfIngredient({
            token,
            ingredientItemId: id
        }))
    }
    
  return (
    <Box>
        <Card className='mt-1'>
            <CardHeader 
                action={
                    <IconButton onClick={handleOpen} aria-label="settings">
                        <Create />
                    </IconButton>
                }
                title={"Ingredients"}
                sx={{ pt:2, alignItems:"center" }}
            />
            <CardActions 

            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Category</TableCell>
                            <TableCell align="right">Availability</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        ingredients?.ingredients?.map((ingredient) => (
                            <TableRow
                                key={ingredient.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {ingredient.id}
                                </TableCell>
                                <TableCell align="right">{ingredient.name}</TableCell>
                                <TableCell align="right">{ingredient.category.name}</TableCell>
                                <TableCell align="right">
                                    <Button 
                                        onClick={() => handleUpdateStock(ingredient.id)} 
                                        variant='contained'
                                        className='py-[1rem] px-[2rem]'
                                        color={ ingredient.inStock ? "success" : "error"}
                                    >
                                        {
                                            ingredient.inStock ? "In Stock" : "Out of Stock"
                                        }
                                    </Button>  
                                </TableCell>
                            </TableRow>
                        ))
                    }
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <CreateIngredientForm />
            </Box>
        </Modal>
    </Box>
  );
}

export default IngredientsTable;