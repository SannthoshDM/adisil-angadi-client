import { Box, Button, Card, Grid, Modal, TextField } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AddressCart from '../Cart/AddressCart';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from "yup";
import { addUserAddress } from '../State/Authentication/AuthAction';


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


const Address = () => {

  const [open, setOpen] = React.useState(false);
  const { auth } = useSelector(store => store);
  const dispatch = useDispatch();

  console.log(" INSIDE ADDRESS PROFILE : auth : ",auth);

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
            address:{
                streetAddress: values.streetAddress,
                city: values.city,
                state: values.state,
                pinCode: values.pinCode,
                country: "India"
            }
        }

    // dispatch(createOrder(data));
        dispatch(addUserAddress(data));

    // After submit the new delivery address and create order request is passed , we have close the model automatically 
    // so here we are closing the address modal
        handleClose();
    }


  return (
    <div>
      <div className='flex px-7 flex-col'>
        <h1 className='text-xl text-center py-7 font-semibold'>My Delivery Addresses</h1>
        <div className='space-y-5'>
          {
            auth?.addresses?.length > 0  ? (
                <div>
                    <div className='flex gap-5 flex-wrap justify-center'>
                        {
                            auth?.addresses?.map((item) => (
                                <AddressCart item={item} showButton={false} handleSelectAddress={createOrderUsingSelectedAddress}/>
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
                <Card className="flex gap-5 w-64 p-5">
                    <AddLocationAltIcon />
                    <div className="space-y-3 text-gray-500">
                        <h1 className="font-semibold text-lg text-white">
                            Add New Address
                        </h1>
                        <Button variant="outlined" fullWidth onClick={handleOpenAddressModal}>Add</Button>
                    </div>
                </Card>
            )
          }
        </div>
      </div>

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
                            <Grid xs = {12}>
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
                            <Grid xs = {12}>
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
                            <Grid xs = {12}>
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
                            <Grid xs = {12}>
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
                            <Grid xs={12}>
                                <Button fullWidth variant='contained' type='submit' color='primary'>Add New Address</Button>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </Box>
        </Modal>

    </div>
  );
}

export default Address;