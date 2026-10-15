import React, { useEffect } from 'react'
import AdminSideBar from './AdminSideBar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Orders from '../Orders/Orders';
import Menu from '../Menu/Menu';
import FoodCategory from '../FoodCategory/FoodCategory';
import Ingredients from '../Ingredients/Ingredients';
import Events from '../Events/Events';
import RestaurantDetails from './RestaurantDetails';
import CreateMenuForm from '../Menu/CreateMenuForm';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById, getRestaurantsCategory } from '../../components/State/Restaurant/RestaurantAction';
import { getMenuItemsByRestaurantId } from '../../components/State/Menu/MenuAction';
import { getRestaurantOrder } from '../../components/State/RestaurantOrder/RestaurantOrderAction';

const Admin = () => {

    const dispatch = useDispatch();
    const token = localStorage.getItem("jwt");
    const { restaurant } = useSelector(store => store);

    useEffect(() => {
        dispatch(getRestaurantsCategory({
            token, 
            restaurantId: restaurant.usersRestaurant?.id 
        }));

        dispatch(getRestaurantOrder({
            token,
            restaurantId: restaurant.usersRestaurant?.id,
            orderStatus: null
        }))

        // dispatch(getRestaurantById(token));
        // dispatch(getMenuItemsByRestaurantId({token, restaurantId: restaurant.usersRestaurant?.id }));
    },[])

    const handleClose = () => {

    }

  return (
    <div>
        <div className='lg:flex justify-between'>
            <div>
                <AdminSideBar handleClose={handleClose}/>
            </div>
            <div className='lg:w-[80%]'>
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/orders' element={<Orders />} />
                    <Route path='/menu' element={<Menu />} />
                    <Route path='/category' element={<FoodCategory />} />
                    <Route path='/ingredients' element={<Ingredients />} />
                    <Route path='/events' element={<Events />} />
                    <Route path='/details' element={<RestaurantDetails />} />
                    <Route path='/add-menu' element={<CreateMenuForm />} />
                </Routes>
            </div>
        </div>
    </div>
  );
}

export default Admin;