import { Button, Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import React, { useEffect, useState } from 'react';
import MenuCard from './MenuCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById, getRestaurantsCategoryForUsers } from '../State/Restaurant/RestaurantAction';
import { filterMenuItemsByisSeasonal, filterMenuItemsByisVegetarian, filterMenuItemsBySearch, getMenuItemsByRestaurantId } from '../State/Menu/MenuAction';


const foodCategories = [
    "Veg-Meals",
    "Non-Veg Meals",
    "Dosa",
    "Biriyani",
    "Parota"
]

const foodTypes = [
    {
        label:"All",
        value:"all"
    },
    {
        label:"Vegetarian Only",
        value:"vegetarian"
    },
    {
        label:"Non-Vegetarian Only",
        value:"non_vegetarian"
    },
    {
        label:"Seasonal",
        value:"seasonal"
    }
]

const menus = [1,1,1,1,1,1,1,1,1,1,1]

const RestaurantDetails = () => {

    const [foodType,setFoodType] = useState("all");

    const [foodCategory, setFoodCategory] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem("jwt");
    const { auth, restaurant, menu } = useSelector(store => store);

    const { id } = useParams();
    const restaurantId = id;

    console.log("Inside Restaurant Details :  restaurant : ",restaurant);
    console.log("Inside Restaurant Details :  menu : ",menu);

    useEffect(() => {
        dispatch(getRestaurantById({token,restaurantId}));
        dispatch(getRestaurantsCategoryForUsers({ restaurantId, token }));
        dispatch(getMenuItemsByRestaurantId({ token, restaurantId }));
    },[]);

    const handleFoodType = (e) => {
        console.log("HandleFoodType ===> name : ",e.target.name,", value : ",e.target.value);
        setFoodType(e.target.value);
        console.log("FOOD TYPE : ",foodType);
        handleFilter(e.target.value,foodCategory);

    }

    const handleFoodCategory = (e) => {
        console.log("HandleFoodCategory ===> name : ",e.target.name,", value : ",e.target.value,", key : ",e.target.key);
        setFoodCategory(e.target.value);
        console.log("FOOD CATEGORY : ",foodCategory);
        handleFilter(foodType,e.target.value);
    }


    const handleFilter = (food_type,food_category) => {
        console.log("Inside Handle Filter : ");
        const reqData = {
            token: token,
            restaurantId: restaurantId,
            vegetarian: null,
            seasonal: null,
            foodCategory: null,
            keyword:null
        }

        if(food_type === "all")
        {
            if(food_category !== null)
            {
                reqData.foodCategory = food_category;
            }

            // if(searchKeyword !== null || searchKeyword !== undefined || searchKeyword !== '')
            // {
            //     reqData.keyword = searchKeyword;
            // }

            dispatch(filterMenuItemsBySearch(reqData));
        }
        else if(food_type === "vegetarian")
        {
            reqData.vegetarian = true;

            if(food_category !== null)
            {
                reqData.foodCategory = food_category;
            }

            // if(searchKeyword !== null || searchKeyword !== undefined || searchKeyword !== '')
            // {
            //     reqData.keyword = searchKeyword;
            // }

            dispatch(filterMenuItemsByisVegetarian(reqData));
        }
        else if(food_type === "non_vegetarian")
        {
            reqData.vegetarian = false;

            if(food_category !== null)
            {
                reqData.foodCategory = food_category;
            }

            // if(searchKeyword !== null || searchKeyword !== undefined || searchKeyword !== '')
            // {
            //     reqData.keyword = searchKeyword;
            // }

            dispatch(filterMenuItemsByisVegetarian(reqData));
        }
        else if(food_type === "seasonal")
        {
            reqData.seasonal = true;

            if(food_category !== null)
            {
                reqData.foodCategory = food_category;
            }

            // if(searchKeyword !== null || searchKeyword !== undefined || searchKeyword !== '')
            // {
            //     reqData.keyword = searchKeyword;
            // }

            dispatch(filterMenuItemsByisSeasonal(reqData));
        }
    }


  return (
    <div className='px-5 lg:px-20'>
        <section>
            <h3 className='text-gray-500 py-2 mt-10'>Home/india/indian fast food/3</h3>
            <div>
                <Grid container spacing={2}>
                    <Grid item size={{xs: 12}} >
                        <img className='w-full h-[40vh] object-cover' src={restaurant.restaurant?.images[0]} alt=""/>
                    </Grid>
                    <Grid item size={{xs:12, lg: 6 }} >
                        <img className='w-full h-[40vh] object-cover' src={restaurant.restaurant?.images[1]} alt=""/>
                    </Grid>
                    <Grid item size={{xs:12, lg: 6}}>
                        <img className='w-full h-[40vh] object-cover' src={restaurant.restaurant?.images[0]} alt=""/>
                    </Grid>
                </Grid>
            </div>

            <div className='pt-3 pb-5'>
                <h1 className='text-4xl font-semibold'>{restaurant.restaurant?.name}</h1>
                <p className='text-gray-300 mt-1'>
                    {restaurant.restaurant?.description}
                </p>
                <div className='space-y-3 mt-3'>
                    <p className='text-gray-500 flex items-center gap-3'>
                    <LocationOnIcon></LocationOnIcon>
                    <span>
                        <span>{restaurant.restaurant?.address?.streetAddress},</span>
                        <span>{restaurant.restaurant?.address?.city}, {restaurant.restaurant?.address?.state}</span>
                    </span>
                </p>
                <p className='text-gray-500 flex items-center gap-3'>
                    <CalendarTodayIcon></CalendarTodayIcon>
                    <span>
                        Mon-Sun: 9:00 AM - 9:00 PM (Today)
                    </span>
                </p>
                </div>
                
            </div>
        </section>
        <Divider />
        <section className='pt-[2rem] lg:flex relative'>
            <div className='space-y-10 lg:w-[20%] filter'>
                <div className='box space-y-5 lg:sticky top-28'>
                    <div>
                        <Typography variant='h5' sx={{paddingBottom:"1rem"}}>
                            Food Type
                        </Typography>

                        <FormControl 
                            className='py-10 space-y-5'
                            component={"fieldset"}>
                            <RadioGroup onChange={handleFoodType} name='food_type' value={foodType}>
                                {
                                    foodTypes.map((item) => (
                                        <FormControlLabel 
                                            key={item.value}
                                            value={item.value} 
                                            control={<Radio />} 
                                            label={item.label}
                                        >

                                        </FormControlLabel>
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <Divider/>
                    <div className='pt-[2rem]'>
                        {/* <Typography variant='h5' sx={{paddingBottom:"1rem"}}>
                            Food Category
                        </Typography> */}
                        <div className='flex items-center justify-between pb-[1rem]'>
                            <Typography variant='h5'>
                                Food Category
                            </Typography>

                            {/* Clear text link - only shows up if something is selected */}
                            {foodCategory && (
                                // <button 
                                //     type="button"
                                //     onClick={() => handleFoodCategory({ target: { value: null } })}
                                //     className="text-sm text-gray-500 hover:text-gray-800 underline cursor-pointer transition-colors"
                                // >
                                //     Clear Selection
                                // </button>
                                <Button 
                                    variant="outlined" 
                                    size="small" 
                                    onClick={() => handleFoodCategory({ target: { value: null } })}
                                    sx={{ mt: 2 }}
                                >
                                    Clear
                                </Button>
                            )}
                        </div>

                        <FormControl 
                            className='py-10 space-y-5'
                            component={"fieldset"}>
                            <RadioGroup onChange={handleFoodCategory} name='food_category' value={foodCategory}>
                                {
                                    restaurant.categories?.map((item) => (
                                        <FormControlLabel 
                                            key={item.id}
                                            value={item.name} 
                                            control={<Radio />} 
                                            label={item.name}
                                        >

                                        </FormControlLabel>
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
            </div>

            <div className='space-y-5 lg:w-[80%] lg:pl-10'>
                {
                    menu.menuItems?.map((item) => <MenuCard  item={item} />)
                }
            </div>
        </section>
    </div>
  );
}

export default RestaurantDetails;