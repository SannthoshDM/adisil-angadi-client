import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction } from '../../components/State/Restaurant/RestaurantAction';

const CreateFoodCategory = () => {

    const { restaurant } = useSelector(store => store);
    const dispatch = useDispatch();

    const [formData,setFormData] = useState({categoryName:"", restaurantId:0})

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: formData.categoryName,
            restaurant: {
                id:restaurant.usersRestaurant?.id
            }
        };
        console.log("Submit the category Name : ",data);

        dispatch(createCategoryAction({ 
            reqData: data, 
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
            <h1 className='text-gray-400 text-center text-xl pb-10'>Create Food Category</h1>
            <form 
                style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                onSubmit={handleSubmit}
            >
                <TextField 
                    fullWidth 
                    id="categoryName"
                    name='categoryName'
                    label='Category'
                    variant='outlined'
                    onChange={handleInputChange}
                    value={formData.categoryName}
                >

                </TextField>

                <Button variant="contained" type="submit">
                    Create Food Category
                </Button>
            </form>
        </div>
    </div>
  );
}

export default CreateFoodCategory;