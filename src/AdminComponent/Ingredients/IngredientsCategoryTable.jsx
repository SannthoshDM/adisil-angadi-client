import { Box, Card, CardActions, CardHeader, IconButton, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect } from 'react'
import Paper from '@mui/material/Paper';
import { Create, Delete } from '@mui/icons-material';
import CreateIngredientsCategoryForm from "./CreateIngredientsCategoryForm";
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientCategories } from '../../components/State/Ingredients/IngredientsAction';


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

const IngredientsCategoryTable = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { restaurant, ingredients } = useSelector(store => store);
  const token = localStorage.getItem("jwt");

  const dispatch = useDispatch();

  console.log("INSIDE INGREDIENTS CATEGORY TABLE : restaurant : ",restaurant);
  console.log("INSIDE INGREDIENTS CATEGORY TABLE : ingredients.category : ",ingredients?.category);

  useEffect(() => {
    dispatch(getIngredientCategories({
        token,
        restaurantId: restaurant.usersRestaurant?.id
    }))
  },[]);

  return (
    <Box>
        <Card className='mt-1'>
            <CardHeader 
                action={
                    <IconButton onClick={handleOpen} aria-label="settings">
                        <Create />
                    </IconButton>
                }
                title={"Ingredients Category"}
                sx={{ pt:2, alignItems:"center" }}
            />
            <CardActions 

            />
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        ingredients?.category?.map((item) => (
                            <TableRow
                                key={item.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {item.id}
                                </TableCell>
                                <TableCell align="left">{item.name}</TableCell>
                                
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
                <CreateIngredientsCategoryForm />
            </Box>
        </Modal>

    </Box>
  );
}

export default IngredientsCategoryTable;