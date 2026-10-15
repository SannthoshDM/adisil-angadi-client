import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createIngredientCategory } from '../../components/State/Ingredients/IngredientsAction';

const CreateIngredientsCategoryForm = () => {

    const [formData,setFormData] = useState({
        name:"", 
        restaurantId:0
    });

    const dispatch = useDispatch();
    const { restaurant } = useSelector(store => store);

    console.log("INSIDE CREATE INGREDIENT CATORY FORM : restaurant :", restaurant);


    const handleSubmit = (e) => {
        e.preventDefault();
        formData.restaurantId = restaurant?.usersRestaurant?.id;
        console.log("Submit the ingredient category Name : ",formData);

        dispatch(createIngredientCategory({
            data: formData,
            token: localStorage.getItem("jwt")
        }))
    }

    const handleInputChange = (e) => {
        const {name,value} = e.target
        setFormData({
            ...formData,[name]: value
        })
        console.log("formData",formData);
    }

  return (
    <div className=''>
        <div className='p-5'>
            <h1 className='text-gray-400 text-center text-xl pb-10'>Create Ingredients Category</h1>
            <form 
                style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                onSubmit={handleSubmit}
            >
                <TextField 
                    fullWidth 
                    id="name"
                    name='name'
                    label='Category'
                    variant='outlined'
                    onChange={handleInputChange}
                    value={formData.name}
                >

                </TextField>

                <Button onClick={handleSubmit} variant="contained" type="submit">
                    Create Ingredients Category
                </Button>
            </form>
        </div>
    </div>
  );
}

export default CreateIngredientsCategoryForm;