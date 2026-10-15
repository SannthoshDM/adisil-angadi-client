import { Box, Button, Card, Divider, Grid, Modal, TextField } from '@mui/material';
import React from 'react'
import CartItem from './CartItem';
import AddressCart from './AddressCart';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../State/Order/OrderAction';


// const cartItems=[1,1,1,1]

const customerAddresses = [1,1,1,1]

export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
    streetAddress:"",
    city:"",
    state:"",
    pinCode:""
}

const validationSchema = Yup.object({
    streetAddress: Yup.string().required("Street Address is required"),
    city: Yup.string().required("City Name is required"),
    state: Yup.string().required("State Name is required"),
    pinCode: Yup.number().required("Pincode is required")
})


const Cart = () => {

    const [open, setOpen] = React.useState(false);
    const { cart } = useSelector(store => store);
    console.log("INSIDE CART FILE : cart VALUES ",cart);
    const dispatch = useDispatch();
    
    const itemTotal = cart.cart? cart.cart.total : 0;
    const deliveryCharges = itemTotal ? 50 : 0;
    const gst = Math.floor(itemTotal * 0.05);
    const totalBillAmount = itemTotal + deliveryCharges + gst;

    const createOrderUsingSelectedAddress = (value) => {
        handleSubmit(value);
    }

    const handleOpenAddressModal = () => {
        setOpen(true);
    }
    
    const handleClose = () => setOpen(false);

    const handleSubmit = (values) => {
    console.log("fome value : ",values);

    const data = {
        token: localStorage.getItem("jwt"),
        order:{
            restaurantId: cart.cart?.item[0].food?.restaurant.id,
            deliveryAddress: {
                streetAddress: values.streetAddress,
                city: values.city,
                state: values.state,
                pinCode: values.pinCode,
                country: "India"
            },
            totalBillAmount: totalBillAmount
        }
    }

    dispatch(createOrder(data));

    // After submit the new delivery address and create order request is passed , we have close the model automatically 
    // so here we are closing the address modal
    handleClose();
}


  return (
    <div className=''>
        <main className='lg:flex justify-between'>
            <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10 bg-gray-900'>
                {
                   cart.cart?.item.length > 0 ? (
                     cart.cart.item.map((item) => (
                        <CartItem item={item}/>
                        )) 
                    ) : (
                        <div><p className='text-center font-semibold text-2xl py-10'>Cart is Empty</p></div>
                    )  
                }
                <Divider />
                <div className='billDetails px-5 text-sm pb-8'>
                    <p className='font-extralight py-5'>Bill Details</p>
                    <div className='space-y-3'>
                        <div className='flex justify-between text-gray-400'>
                            <p>Item Total</p>
                            <p>₹{itemTotal}</p>
                        </div>
                        <div className='flex justify-between text-gray-400'>
                            <p>Delivery Charge</p>
                            <p>₹{deliveryCharges}</p>
                        </div>
                        <div className='flex justify-between text-gray-400'>
                            <p>GST and Restaurant Charges</p>
                            <p>₹{gst}</p>
                        </div>
                        <Divider />
                    </div>
                    <div className='flex justify-between text-gray-400 pt-4'>
                        <p>Total Pay</p>
                        <p>₹{totalBillAmount}</p>
                    </div>
                </div>
            </section>
            <Divider orientation='vertical' flexItem/>
            <section className='lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0'>
                {
                    cart.cart?.item.length > 0  ? (
                        <div>
                            <h1 className='text-center font-semibold text-2xl py-10'>
                                Choose Delivery Address
                            </h1>
                            <div className='flex gap-5 flex-wrap justify-center'>
                                {
                                    cart.cart?.customer.addresses.map((item) => (
                                        <AddressCart item={item} showButton={true} handleSelectAddress={createOrderUsingSelectedAddress}/>
                                    ))
                                }

                                <Card className="flex gap-5 w-64 p-5">
                                    <AddLocationAltIcon />
                                    <div className="space-y-3 text-gray-500">
                                        <h1 className="font-semibold text-lg text-white">
                                            Add New Address
                                        </h1>
                                        <Button variant="outlined" fullWidth onClick={handleOpenAddressModal}>Add</Button>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    ) : ( 
                        <div><p className='text-center font-semibold text-2xl py-10'>No Delivery Address found</p></div>
                    )
                }
                
            </section>

        </main>

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Formik 
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs = {12}>
                                <Field 
                                    as={TextField}
                                    name="streetAddress"
                                    label="Street Address"
                                    fullWidth
                                    variant="outlined"
                                    error={!ErrorMessage("streetAddress")}
                                    helperText={
                                        <ErrorMessage 
                                            name="streetAddress"
                                            render={ msg => <span className='text-red-600'>{msg}</span>}
                                        >
                                            {/* {
                                                (msg) => <span className='text-red-600'>{msg}</span>
                                            } */}
                                        </ErrorMessage>
                                    }
                                />
                            </Grid>
                            <Grid item xs = {12}>
                                <Field 
                                    as={TextField}
                                    name="city"
                                    label="City"
                                    fullWidth
                                    variant="outlined"
                                    error={!ErrorMessage("city")}
                                    helperText={
                                        <ErrorMessage 
                                            name="city"
                                            render={ msg => <span className='text-red-600'>{msg}</span>}
                                        >
                                            {/* {
                                                (msg) => <span className='text-red-600'>{msg}</span>
                                            } */}
                                        </ErrorMessage>
                                    }
                                />
                            </Grid>
                            <Grid item xs = {12}>
                                <Field 
                                    as={TextField}
                                    name="state"
                                    label="State"
                                    fullWidth
                                    variant="outlined"
                                    error={!ErrorMessage("state")}
                                    helperText={
                                        <ErrorMessage 
                                            name="state"
                                            render={ msg => <span className='text-red-600'>{msg}</span>}
                                        >
                                            {/* {
                                                (msg) => <span className='text-red-600'>{msg}</span>
                                            } */}
                                        </ErrorMessage>
                                    }
                                />
                            </Grid>
                            <Grid item xs = {12}>
                                <Field 
                                    as={TextField}
                                    name="pinCode"
                                    label="Pincode"
                                    // type="number"
                                    fullWidth
                                    variant="outlined"
                                    error={!ErrorMessage("pinCode")}
                                    helperText={
                                        <ErrorMessage 
                                            name="pinCode"
                                            render={ msg => <span className='text-red-600'>{msg}</span>}
                                        >
                                            {/* {
                                                (msg) => <span className='text-red-600'>{msg}</span>
                                            } */}
                                        </ErrorMessage>
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button fullWidth variant='contained' type='submit' color='primary'>Deliver Here</Button>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </Box>
        </Modal>

    </div>
  );
}

export default Cart;