// import { Box, Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, Card, CardContent, Chip, Divider, Menu, MenuItem, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateOrderStatus } from '../../components/State/RestaurantOrder/RestaurantOrderAction';


// 1. Function to get initials based on the name format
const getInitials = (name) => {
  if (!name) return '';
  const cleanName = name.trim().replace(/\s+/g, ' '); // Remove extra spaces
  const parts = cleanName.split(' ');
  
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  
  return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
};

// 2. Curated safe color palette (Excludes your specific colors & dark/black tones)
const SAFE_COLORS = [
  '#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e',
  '#e67e22', '#e74c3c', '#d35400', '#c0392b', '#16a085',
  '#27ae60', '#2980b9', '#8e44ad', '#f1c40f', '#f39c12'
];

// 3. Deterministic hashing to map a name to a unique color from the palette
const getColorFromName = (name) => {
  if (!name) return SAFE_COLORS[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % SAFE_COLORS.length;
  return SAFE_COLORS[index];
};

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: getColorFromName(name),
    },
    children: getInitials(name),
  };
}

const ORDER_STATUS = ["PENDING", "OUT_FOR_DELIVERY", "DELIVERED", "COMPLETED"] ;

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


const OrderTable = ({item}) => {
    
    const dispatch = useDispatch();
    const token = localStorage.getItem("jwt");

    // 1. Add menu state
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);

    // 2. Handlers to open and close the menu
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleStatusUpdate = (status) => {
        console.log("Updating order to status:", status);
        // Put your API call or parent state function update here!
        


        dispatch(updateOrderStatus({
            token,
            orderId: item.id,
            orderStatus: status
        }));
        
        handleMenuClose(); // Close the menu after selection
    };

    return (
        // here when i hover accordian, these effects will be applied to the hovering accordian
        <Accordion 
            key={item.id}
            disableGutters
            sx={{
                marginBottom: '16px',
                borderRadius: '12px',
                '&:before': {
                display: 'none', // 4. Hides the default top border line between stacked accordions
                },
                '&:last-child': {
                marginBottom: 0, // Keeps the layout clean for the last item
                },
                overflow: 'hidden', // Ensures the inner ripple effect respects the border radius
                boxShadow: '0px 2px 8px rgba(0,0,0,0.05)', // Optional: softer shadow
                '&:hover': {
                    backgroundColor: '#c3ed7b',
                    color: '#000000',           // Changes hover text color
                    '& .MuiAccordionSummary-expandIconWrapper': {
                        color: '#000000',         // Optional: Changes expand icon color on hover
                    },
                    '& .update-order-status-button': {
                        color: "#ff5722",
                        backgroundColor: "#fae7e1",
                        borderColor: "#ff5722"
                    }
                },
                '&:hover .custom-divider':{
                    backgroundColor: "#000000",
                },
            }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${item.id}-panel1-content`}
                id={`${item.id}-panel1-header`}
            >
                <div className='lg:flex items-center justify-between'>
                    <div className='lg:flex items-center lg:gap-5'>
                        <Avatar {...stringAvatar(item.customer.name)}></Avatar>
                        <div className='space-y-1 lg:space-y-2 lg:max-w-2xl'>
                            <p className='font-sans text-base font-semibold'>Order Id : <span className='italic font-light'>{item.id}</span></p>
                            <p className='font-sans text-base font-semibold'>Order at : <span className='italic font-light'>{item.createdAt.split('T')[0]}</span></p>
                            <p className='font-sans text-base font-semibold'>Customer Name : <span className='italic font-light'>{item.customer.name}</span></p>
                            <p className='font-sans text-base font-semibold'>Delivery Address : <span className='italic font-light'>{item.deliveryAddress.streetAddress}, {item.deliveryAddress.city}, {item.deliveryAddress.state}, {item.deliveryAddress.pincode}</span></p>
                            <p className='font-sans text-base font-semibold'>Total Amount : <span className='italic font-light'>₹{item.totalAmount}</span></p>
                            <p className='font-sans text-base font-semibold'>Total Items : <span className='italic font-light'>{item.totalItem}</span></p>
                        </div>
                    </div>
                </div>
                {/* Container to push the button to the right, near the expand icon - */}
                <div style={{ 
                        display: 'flex', 
                        flexDirection: 'column', // Stacks the children vertically
                        alignItems: 'center',    // Centers them horizontally
                        gap: '8px',              // Adds clean spacing between Chip and Button
                        marginLeft: 'auto', 
                        marginRight: 16,
                        justifyContent: 'center',
                        alignSelf: 'center'  
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <p className='font-sans text-base font-semibold'>Current Order Status - </p>
                        <Chip 
                            size="small" 
                            variant="contained" 
                            color={getStatusColor(item.orderStatus)}
                            label={item.orderStatus}
                        />
                    </div>
                    <div>
                        <Button 
                            className="update-order-status-button" 
                            sx={{ color: "#8ec42f" }} 
                            variant='outlined'
                            onClick={handleMenuOpen} // Opens dropdown menu
                        >
                            Update Order Status
                        </Button>

                        {/* Dropdown Menu Component */}
                        <Menu
                            anchorEl={anchorEl}
                            open={isMenuOpen}
                            onClose={handleMenuClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            {
                                ORDER_STATUS.map((item,index) => (
                                    <MenuItem key={index} onClick={() => handleStatusUpdate(item)}>{item}</MenuItem>
                                ))
                            }
                        </Menu>
                    </div>
                    
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

                                    </Box>

                                    {/* Quantity & Price */}
                                    <Box sx={{ 
                                        textAlign: 'right', 
                                        display: 'flex', 
                                        flexDirection:'column',
                                        justifyContent: 'center'
                                    }}>
                                        <Typography variant='body2' color='text.secondary'>
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

}

export default OrderTable;