import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, FormControlLabel, FormGroup } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import groupIngredientsByCategory from '../utils/categorizeIngredients';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../State/Cart/CartAction';

const foodIngredients = [
    {
        category: "Rice",
        ingredients:["Basmathi","Seraga"]
    },
    {
        category:"Vegetables & Proteins",
        ingredients:["Carrots","French beans","Panner","Potatoes","Mushroom"]
    },
    {
        category:"Aromatices & Wet Ingredients",
        ingredients:["Onions","Tomatoes","Garlic Paste","Curd"]
    },
    {
        category:"Spices",
        ingredients:["Bay leaf","Cinnamon Stick","Cardamom","Biriyani Powder"]
    },
    {
        category:"Herbs",
        ingredients:["Mint leaves","Coriander Leaves"]
    }

]

const MenuCard = ({item}) => {

    // const id = React.useId();
    const [selectedIngredients,setSelectedIngredients] = useState([]);
    const dispatch = useDispatch();

    const FoodIngredients = groupIngredientsByCategory(item.ingredients);

    console.log("after categorize food ingredients : ",FoodIngredients);

    // const handleCheckBoxChange = (value) => {
    //     console.log(value);
    // }

    const handleAddItemToCart = (e) => {
        // it prevent reloading the page, by after add item to cart button
        e.preventDefault();
        const reqData = {
            token: localStorage.getItem("jwt"),
            cartItem: {
                foodId: item.id,
                quantity:1,
                ingredients: selectedIngredients
            }
        };

        console.log("Adding item to Cart : ",reqData);
        dispatch(addItemToCart(reqData));
    };

    const handleCheckBoxChange = (itemName) => {
        console.log("handle Check Box Change is clicked , value : ",itemName);
        if(selectedIngredients.includes(itemName)){
            setSelectedIngredients(
                selectedIngredients.filter(
                    (item) => item !== itemName
                )
            )
        }
        else{
            setSelectedIngredients([...selectedIngredients,itemName])
        }
    }

  return (
    // here when i hover accordian, these effects will be applied to the hovering accordian
    <Accordion sx={{
                '&:hover': {
                    backgroundColor: '#c3ed7b',
                    color: '#000000',           // Changes hover text color
                    '& .MuiAccordionSummary-expandIconWrapper': {
                        color: '#000000',         // Optional: Changes expand icon color on hover
                    }
                },
                '&:hover .custom-divider':{
                    backgroundColor: "#000000",
                },
                '&:hover .custom-description':{
                    color: "#424242"
                },
                '&:hover .my-custom-checkbox-class':{
                    color: "#000000"
                }
            }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${item.id}-panel1-content`}
          id={`${item.id}-panel1-header`}
        >
          <div className='lg:flex items-center justify-between'>
            <div className='lg:flex items-center lg:gap-5'>
                <img className='w-[7rem] h-[7rem] object-cover'
                    src={item.images[0]}
                    alt=''>
                </img>
                <div className='space-y-1 lg:space-y-5 lg:max-w-2xl'>
                    <p className='font-semibold text-xl'>{item.name}</p>
                    <p>₹ {item.price}</p>
                    <p className='text-gray-500 custom-description'>{item.description}</p>
                </div>
            </div>
          </div>
        </AccordionSummary>
        <Divider className="custom-divider" 
                sx={{ transition: 'background-color 0.3s' }} // Smooth transition
         />
        <AccordionDetails>
          <form onSubmit={handleAddItemToCart}>
            <div className='flex gap-5 flex-wrap'>
                {
                    groupIngredientsByCategory(item.ingredients).map((values) => (
                        <div>
                            <p>{values.category.name}</p>
                            <FormGroup>
                                {
                                    values.foodIngredients.map((ingredent) => (
                                        <FormControlLabel 
                                                key= {ingredent.name}
                                                control={
                                                    <Checkbox className='my-custom-checkbox-class' onChange={() => handleCheckBoxChange(ingredent.name)}/>
                                                } 
                                                label={ingredent.name} 
                                        />
                                    ))
                                }
                            </FormGroup>
                        </div>
                    ))
                }
            </div>
            <div className='pt-5'>
                <Button variant="contained" disabled={false} type='submit'>{true?"Add to Cart":"Out of Stock"}</Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
  );
}

export default MenuCard;