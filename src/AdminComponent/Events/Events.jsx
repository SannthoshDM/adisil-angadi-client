import { Box, Button, Grid, Modal, TextField } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 400,
  width: 'calc(100% - 32px)',
  maxWidth: 400,
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  pb: '350px',

  // Clean scrollbar styles for a better look
  '&::-webkit-scrollbar': { width: '6px' },
  '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '4px' }
};

const initialValues = {
    image:"",
    location:"",
    name:"",
    startedAt:null,
    endsAt:null
};

const Events = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formValues,setFormValues] = React.useState(initialValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("SUBMIT EVENT DATA : ",formValues);
    setFormValues(initialValues);

  }

  const handleFormChange = (e) => {
    setFormValues({...formValues,[e.target.name]: e.target.value})
  }

  const handleDateChange = (newValue,dateType) => {

    if (newValue && newValue.isValid()) {
      console.log("INSIDE IF");
      // Corrected Day.js tokens: YYYY and DD must be capitalized
      const formattedDate = newValue.format("MMMM DD, YYYY hh:mm A");
      setFormValues({ ...formValues, [dateType]: formattedDate });
    } else {
      // Handle cleared input
      console.log("INSIDE ELSE .....");
      setFormValues({ ...formValues, [dateType]: "" });
    }
    console.log("FORM VALUES : ",formValues);
  }

  return (
    <div>
      <div className='p-5'>
        <Button variant='contained' onClick={handleOpen}>Create New Event</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item size={{ xs:12 }}>
                  <TextField 
                    name='image'
                    label="Image Url"
                    variant='outlined'
                    fullWidth
                    value={formValues.image}
                    onChange={handleFormChange}
                  />
                </Grid>

                <Grid item size={{ xs:12 }}>
                  <TextField 
                    name='location'
                    label="Location"
                    variant='outlined'
                    fullWidth
                    value={formValues.location}
                    onChange={handleFormChange}
                  />
                </Grid>

                <Grid item size={{ xs:12 }}>
                  <TextField 
                    name='name'
                    label="Event Name"
                    variant='outlined'
                    fullWidth
                    value={formValues.name}
                    onChange={handleFormChange}
                  />
                </Grid>

                <Grid item size={{ xs:12 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker 
                      label="Start Date and Time"
                      value={formValues.startedAt ? dayjs(formValues.startedAt, "MMMM DD, YYYY hh:mm A") : null}
                      onChange={(newValue) => 
                        handleDateChange(newValue, "startedAt")
                      }
                      inputFormat="MM/DD/YYYY hh:mm A"
                      className='w-full'
                      sx={{ width: "100%"}}
                      slotProps={{ 
                        textField: { fullWidth: true }
                      }}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item size={{ xs:12 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker 
                      label="End Date and Time"
                      value={formValues.endsAt ? dayjs(formValues.endsAt, "MMMM DD, YYYY hh:mm A") : null}
                      onChange={(newValue) => 
                        handleDateChange(newValue, "endsAt")
                      }
                      inputFormat="MM/DD/YYYY hh:mm A"
                      className='w-full'
                      sx={{ width: "100%"}}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Box className="mt-4">
                <Button variant="contained" color='primary' type="submit">
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default Events;