import { Button, TextField, Typography } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../State/Authentication/AuthAction";


const initialValues = {
  email:"",
  password:""
}

const LoginForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log("LoginForm.jsx : ",values);
    dispatch(loginUser({userData:values,navigate}))
  }


  return (
    <div>
      <Typography variant="h5" className="text-center">
        Login
      </Typography>

      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>
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
         <Button sx={{marginTop:2, padding:"1rem"}} fullWidth type="submit" variant="contained">Login</Button>
        </Form>
      </Formik>
      <Typography variant="body2" align="center" sx={{marginTop:3}}>
        Don't have an account?
        <Button size="small" sx={{marginLeft:1}} onClick={() => navigate("/account/register") }>
          register
        </Button>
      </Typography>
    </div>
  );
}

export default LoginForm;