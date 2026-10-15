import { useEffect, useState } from 'react'
import './App.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { darkTheme } from './Theme/DarkTheme'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './components/State/Authentication/AuthAction'
import { findCart } from './components/State/Cart/CartAction'
import Routers from './Routers/Routers'
import { getRestaurantByUserId } from './components/State/Restaurant/RestaurantAction'

// import { store } from './components/State/store'

function App() {

  const dispatch = useDispatch();
  const token = localStorage.getItem("jwt");

  // here useSelector will get the value from /src/components/State/store.js file, in there rootReducer value
  // here we are de-structuring it , that is -> we are only selecting the auth value in the rootReducer object
  const {auth} = useSelector(store=>store);

  useEffect(()=>{
    dispatch(getUser(auth.token || token));
    dispatch(findCart(token));
  },[auth.token]);

  useEffect(() => {
    dispatch(getRestaurantByUserId(auth.token || token));
  },[auth.user])

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline></CssBaseline>
      <Routers />
    </ThemeProvider>
  );
}

export default App
