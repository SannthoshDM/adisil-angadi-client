import axios from "axios";
import { ADD_TO_FAVORITE_FAILURE, ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./AuthActionType";
import { api, API_URL } from "../../config/api";

export const registerUser=(reqData)=>async(dispatch)=>{
    dispatch({type:REGISTER_REQUEST})
    try{
        const {data} = await axios.post(`${API_URL}/auth/signup`,reqData.userData)
        if(data.token){
            localStorage.setItem("jwt",data.token);
        }
        if(data.role === "ROLE_RESTAURANT_OWNER"){
            reqData.navigate("/admin/restaurant")
        }
        else{
            reqData.navigate("/")
        }
        dispatch({type:REGISTER_SUCCESS,payload:data.token})
        console.log("Register success : ",data)
    }
    catch(error)
    {
        dispatch({type:REGISTER_FAILURE,payload:error})
        console.log("Register error :",error);
    }
}

export const loginUser=(reqData)=>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    try{
        const {data} = await axios.post(`${API_URL}/auth/login`,reqData.userData)
        if(data.token){
            localStorage.setItem("jwt",data.token);
        }
        if(data.role === "ROLE_RESTAURANT_OWNER"){
            reqData.navigate("/admin/restaurant")
        }
        else{
            reqData.navigate("/")
        }
        dispatch({type:LOGIN_SUCCESS,payload:data.token})
        console.log("Login success : ",data)
    }
    catch(error)
    {
        dispatch({type:LOGIN_FAILURE,payload:error})
        console.log("Login error :",error);
    }
}

// here in dispatch types are changed want to check 
export const getUser=(token)=>async(dispatch)=>{
    dispatch({type:GET_USER_REQUEST})
    try{
        if(!(token === null || token === undefined || token.trim() === ""))
        {
            console.log("jwt:",token);
            const {data} = await api.get(`/api/user/profile`,{
                                    headers:{
                                        Authorization:`Bearer ${token}`
                                    }
                            })
        
            dispatch({type:GET_USER_SUCCESS,payload:data})
            console.log("User Profile : ",data)
        }
        
    }
    catch(error)
    {
        dispatch({type:GET_USER_FAILURE,payload:error})
        console.log("Get User Profile error :",error);
    }
}

export const addToFavorite=(token,restaurantId)=>async(dispatch)=>{
    dispatch({type:ADD_TO_FAVORITE_REQUEST})
    try{
        const {data} = await api.put(`/api/user/restaurants/${restaurantId}/add-favourites`,{},{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        
        dispatch({type:ADD_TO_FAVORITE_SUCCESS,payload:data})
        console.log("Add to Favorite : ",data)
    }
    catch(error)
    {
        dispatch({type:ADD_TO_FAVORITE_FAILURE,payload:error})
        console.log("Add to Favorite error :",error);
    }
}


export const logout=()=>async(dispatch)=>{
    // dispatch({type:LOGOUT})
    try{
        localStorage.clear();
        dispatch({type:LOGOUT})
        console.log("Logout sucsess")
    }
    catch(error)
    {
        console.log("Logout error :",error);
    }
}