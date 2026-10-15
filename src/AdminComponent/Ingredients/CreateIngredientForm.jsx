import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createIngredient } from '../../components/State/Ingredients/IngredientsAction';

const CreateIngredientForm = () => {

    const [formData,setFormData] = useState({
        name:"", 
        ingredientCategoryId:'',
        restaurantId:''
    });
    
    const dispatch = useDispatch();
    const token = localStorage.getItem("jwt");

    const { restaurant, ingredients } = useSelector(store => store);

    console.log("INSIDE CREATE INGREDIENT FORM : restaurant :",restaurant);
    console.log("INSIDE CREATE INGREDIENT FORM : ingredients.category :",ingredients);

    const handleSubmit = (e) => {
        
        e.preventDefault();
        formData.restaurantId=restaurant?.usersRestaurant?.id;

        console.log("Submit the category Name : ",formData);

        dispatch(createIngredient({token, data:formData}));
    }

    const handleInputChange = (e) => {
        const {name,value} = e.target;
        console.log("name : ",name);
        console.log("value :",value);
        setFormData({
            ...formData,
            [name]: value,

        })
        console.log("formData",formData);
    }

  return (
    <div className=''>
        <div className='p-5'>
            <h1 className='text-gray-400 text-center text-xl pb-10'>Create Ingredients</h1>
            <form 
                style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                onSubmit={handleSubmit}
            >
                <TextField 
                    fullWidth 
                    id="name"
                    name='name'
                    label='Ingredients'
                    variant='outlined'
                    onChange={handleInputChange}
                    value={formData.name}
                >

                </TextField>

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formData.ingredientCategoryId}
                        label="Category"
                        onChange={handleInputChange}
                        name="ingredientCategoryId"
                    >
                        {
                            ingredients?.category?.map((item) => (
                                <MenuItem 
                                    key={item.id}
                                    value={item.id}
                                >
                                    {item.name}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>

                <Button onClick={handleSubmit} variant="contained" type="submit">
                    Create Ingredients
                </Button>
            </form>
        </div>
    </div>
  );
}

export default CreateIngredientForm;