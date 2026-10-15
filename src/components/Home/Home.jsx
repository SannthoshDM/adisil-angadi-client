import React, { useEffect } from 'react';
import './Home.css';
import MultiItemCarousel from './MultiItemCarousel';
import RestaurantCard from '../Restaurant/RestaurantCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurantsAction } from '../State/Restaurant/RestaurantAction';
import { useNavigate } from 'react-router-dom';

const restaurants=[1,1,1,1,1,1,1]

const Home = () => {

    const dispatch = useDispatch();
    const token = localStorage.getItem("jwt");
    const {restaurant} = useSelector(store => store);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Inside HOME useEffect method .....");
        dispatch(getAllRestaurantsAction(token));
    },[token]);

    // if restaurant is empty, try passing token int useEffect inside []  -> [token]

    console.log("INSIDE HOME ........",token);
    console.log("restaurant : ",restaurant);

  return (
    <div className='pb-10'>
        <section className='banner -z-50 relative flex flex-col justify-center items-center'>
            <div className='w-[50vw] z-10 text-center'>
                <p className='text-2xl lg:text-6xl font-bold z-10 py-5'>Adisil Angadi</p>
                <p className='z-10 text-gray-300 text-xl lg:text-4xl'>
                    Fresh food, fast delivery.<br/> Get meals from top local spots delivered straight to your door in minutes.
                </p>
            </div>

            <div className='cover absolute top-0 left-0 right-0'>

            </div>

            <div className='fadeout'>

            </div>
        </section>
        <section className='p-10 lg:py-10 lg:px-20 '>
            <p className='text-2xl font-semibold text-gray-400 py-3 pb-10'>Top Meals</p>
            <MultiItemCarousel/>
        </section>
        {
            restaurant?.restaurants.length === 0 ? <></> : 
            <section className='px-5 lg:px-20 pt-10'>
                <h1 className='text-2xl font-semibold text-gray-400 pb-5'>Order From Our Handpicked Favorites</h1>
                {/* in below div tag i have remove justify-around inside className -> for to show restaurat cards in sequence order*/}
                <div className='flex flex-wrap items-center gap-5'>
                    {
                        restaurant.restaurants.map((item) => (
                            <RestaurantCard item = {item}/>
                        ))
                    }
                </div>
            </section>
        }
        
    </div>
  );
}

export default Home;