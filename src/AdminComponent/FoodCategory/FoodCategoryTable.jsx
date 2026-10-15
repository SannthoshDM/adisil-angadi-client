import { Box, Button, Card, CardActions, CardHeader, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect } from 'react'
import Paper from '@mui/material/Paper';
import { Create, Delete } from '@mui/icons-material';
import CreateFoodCategory from './CreateFoodCategory';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantsCategory } from '../../components/State/Restaurant/RestaurantAction';



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


const FoodCategoryTable = () => {

  const { restaurant } = useSelector(store => store);
  const dispatch = useDispatch();
  const token = localStorage.getItem("jwt");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log("INSIDE FOOD CATEGORY TABLE : ",restaurant);

  useEffect(() => {
    dispatch(getRestaurantsCategory({
        token,
        restaurantId: restaurant.usersRestaurant?.id
    }));
  },[]);

  return (
    <Box>
        <Card className='mt-1'>
            <CardHeader 
                action={
                    <Button 
                        variant='contained'
                        onClick={handleOpen} 
                        endIcon={<Create />}
                    >
                        Create Food Category
                    </Button>
                }
                title={"Food Category"}
                sx={{ pt:2, alignItems:"center" }}
            />
            <CardActions 

            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        restaurant?.categories?.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                
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
                <CreateFoodCategory />
            </Box>
        </Modal>
    </Box>
  );
}

export default FoodCategoryTable;