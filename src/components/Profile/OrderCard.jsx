import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, Chip, Divider, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react'


const getStatusColor = (status) => {
  switch (status) {
    case 'PENDING':
      return 'warning'; // Renders Amber / Orange
    case 'OUT_FOR_DELIVERY':
      return 'info';    // Renders Bright Blue
    case 'DELIVERED':
    case 'COMPLETED':
      return 'success'; // Renders Green
    default:
      return 'default';
  }
};


const OrderCard = ({ item }) => {

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
                    src={item.items[0].food.restaurant.images[0]}
                    alt=''>
                </img>
                <div className='space-y-1 lg:space-y-2 lg:max-w-2xl'>
                    <p className='font-sans text-base font-semibold'>Order Id : <span className='italic font-light'>{item.id}</span></p>
                    <p className='font-sans text-base font-semibold'>Order at : <span className='italic font-light'>{item.createdAt.split('T')[0]}</span></p>
                    <p className='font-sans text-base font-semibold'>Restaurant : <span className='italic font-light'>{item.items[0].food.restaurant.name}</span></p>
                    <p className='font-sans text-base font-semibold'>Delivery Address : <span className='italic font-light'>{item.deliveryAddress.streetAddress}, {item.deliveryAddress.city}, {item.deliveryAddress.state}, {item.deliveryAddress.pincode}</span></p>
                    <p className='font-sans text-base font-semibold'>Total Amount : <span className='italic font-light'>₹{item.totalAmount}</span></p>
                    <p className='font-sans text-base font-semibold'>Total Items : <span className='italic font-light'>{item.totalItem}</span></p>
                </div>
            </div>
          </div>
          {/* Container to push the button to the right, near the expand icon */}
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: 16 }} onClick={(e) => e.stopPropagation()}>
                <Button 
                    component="span"
                    size="small" 
                    variant="contained" 
                    color={getStatusColor(item.orderStatus)}
                >
                    {item.orderStatus}
                </Button>
            </div>
        </AccordionSummary>
        <Divider className="custom-divider" 
                sx={{ transition: 'background-color 0.3s' }} // Smooth transition
         />
        <AccordionDetails>
            <Box 
                sx={{
                    display:'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: '100%'
                }}
            >
                {
                    item.items.map((value) => (
                        <Card key={value.id} variant='outlined' sx={{ width: '100%'}}>
                            <CardContent 
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 3,
                                    '&:last-child': { paddingBottom: 2 }
                                }}
                            >
                                {/* Left Side of the card */}
                                <Box 
                                    component="img"
                                    src={value.food.images[0]}
                                    alt={value.food.name}
                                    sx= {{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 1,
                                        objectFit: 'cover'
                                    }}
                                >
                                </Box>

                                {/* Food Name and Added Ingredients */}
                                <Box 
                                    sx={{
                                        flexGrow: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 1
                                    }}
                                >
                                    <Typography variant='subtitle1' fontWeight="bold">
                                        {value.food.name}
                                    </Typography>

                                    {
                                        value.ingredients.length === 0 ? <></> :
                                        <Box>
                                            <Typography variant='caption' color='text.secondary' display="block" sx={{ mb: 0.5 }}>
                                                Added Ingredients
                                            </Typography>

                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {
                                                    value.ingredients.map((ingredient, idx) => (
                                                        <Chip 
                                                            key={idx}
                                                            label={ingredient}
                                                            size='small'
                                                            variant='outlined'
                                                            sx={{
                                                                backgroundColor: "#c3ed7b",
                                                                color: "#000000"
                                                            }}
                                                        />
                                                    ))
                                                }

                                            </Box>
                                        </Box>
                                    }
                                </Box>

                                {/* Quantity & Price */}
                                <Box sx={{ 
                                    textAlign: 'right', 
                                    display: 'flex', 
                                    flexDirection:'column',
                                    justifyContent: 'center'
                                }}>
                                    <Typography variant='body2' color='tex.secondary'>
                                        Quantity : {value.quantity}
                                    </Typography>
                                    <Typography variant='subtitle1' fontWeight="bold" color='primary.main'>
                                        Total Price : ₹{value.totalPrice}
                                    </Typography>

                                </Box>

                            </CardContent>
                        </Card>
                    ))
                }
            </Box>
        </AccordionDetails>
      </Accordion>
    );
};


export default OrderCard;