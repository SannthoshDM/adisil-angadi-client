import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../State/Authentication/AuthAction";
import { useDispatch } from "react-redux";


const initialValues = {
  name:"",
  email:"",
  password:"",
  role:""
}

const RegisterForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log("RegisterForm.jsx : ",values);
    dispatch(registerUser({userData:values,navigate}))
  }

  return (
    <div>
      <Typography variant="h5" className="text-center">
        Sign Up
      </Typography>

      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>
          <Field 
            as={TextField}
            name="name"
            label="FullName"
            fullWidth
            variant="outlined"
            margin="normal"
         />
          <Field 
            as={TextField}
            name="email"
            label="Email"
            fullWidth
            variant="outlined"
            margin="normal"
         />
         <Field 
            as={TextField}
            name="password"
            label="Password"
            fullWidth
            variant="outlined"
            margin="normal"
            type="password"
         />
         {/* <FormControl fullWidth margin="normal"> */}
          {/* <InputLabel id="role-label" fullwidth margin="normal" >Role</InputLabel> */}
          <Field 
            fullWidth
            margin="normal"
            as={Select}
            labelId="role-label"
            // label="Role"
            id="role"
            name="role"
          >
            <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
            <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Restaurant Owner</MenuItem>
          </Field>
         {/* </FormControl> */}
         <Button sx={{marginTop:2, padding:"1rem"}} fullWidth type="submit" variant="contained">Register</Button>
        </Form>
      </Formik>
      <Typography variant="body2" align="center" sx={{marginTop:3}}>
        If you already have an account?
        <Button size="small" sx={{marginLeft:1}} onClick={() => navigate("/account/login") }>
          Login
        </Button>
      </Typography>
    </div>
  );
}

export default RegisterForm;