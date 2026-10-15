import { api, API_URL } from "../../config/api";

import * as CartActionTypes from "./CartActionType";

export const findCart = (token) => {
    return async (dispatch) => {
        dispatch({ type:CartActionTypes.FIND_CART_REQUEST });
        try{
            const response = await api.get("/api/user/cart",{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });

            
            console.log("Success : Find Cart of the User : ",response.data);
            dispatch({ type:CartActionTypes.FIND_CART_SUCCESS , payload:response.data });
        }
        catch(error)
        {
            console.log("Error : Find Cart of the User : ",error);
            dispatch({ type:CartActionTypes.FIND_CART_FAILURE , payload:error });
        }
    };
};


// here, this API is not written in SERVER SIDE
export const getAllCartItems = (reqData) => {
    return async (dispatch) => {
        dispatch({ type:CartActionTypes.GET_ALL_CART_ITEMS_REQUEST });
        try{
            const response = await api.get(`/api/user/cart/${reqData.cartId}/items`,{
                headers:{
                    Authorization: `Bearer ${reqData.token}`,
                },
            });

            
            console.log("Success : Get all Items form Cart for User : ",response.data);
            dispatch({ type:CartActionTypes.GET_ALL_CART_ITEMS_SUCCESS , payload:response.data });
        }
        catch(error)
        {
            console.log("Error : Get all Items form Cart for User : ",error);
            dispatch({ type:CartActionTypes.GET_ALL_CART_ITEMS_FAILURE , payload:error });
        }
    };
};


export const addItemToCart = (reqData) => {
    return async (dispatch) => {
        dispatch({ type:CartActionTypes.ADD_ITEM_TO_CART_REQUEST });
        try{
            const response = await api.put("/api/user/cart/add", reqData.cartItem, {
                headers:{
                    Authorization: `Bearer ${reqData.token}`,
                },
            });

            
            console.log("Success : Add Item to Cart of the User : ",response.data);
            dispatch({ type:CartActionTypes.ADD_ITEM_TO_CART_SUCCESS , payload:response.data });
        }
        catch(error)
        {
            console.log("Error : Add Item to Cart of the User : ",error);
            dispatch({ type:CartActionTypes.ADD_ITEM_TO_CART_FAILURE , payload:error.message });
        }
    };
};


export const updateCartItem = (reqData) => {
    return async (dispatch) => {
        dispatch({ type:CartActionTypes.UPDATE_CART_ITEM_REQUEST });
        try{
            const response = await api.put("/api/user/cart/cart-item/update", reqData.data ,{
                headers:{
                    Authorization: `Bearer ${reqData.token}`,
                },
            });

            
            console.log("Success : Update Cart Item of the User : ",response.data);
            dispatch({ type:CartActionTypes.UPDATE_CART_ITEM_SUCCESS , payload:response.data });
        }
        catch(error)
        {
            console.log("Error : Update Cart Item of the User : ",error);
            dispatch({ type:CartActionTypes.UPDATE_CART_ITEM_FAILURE , payload:error.message });
        }
    };
};


export const removeCartItem = ({cartItemId, token}) => {
    return async (dispatch) => {
        dispatch({ type:CartActionTypes.REMOVE_CART_ITEM_REQUEST });
        try{
            const response = await api.delete(`/api/user/cart/cart-item/${cartItemId}/remove`,{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });

            
            console.log("Success : Remove Cart Item from Cart by User : ",response.data);
            // here in dispatch payload , i used response.data instead of cartItemId
            dispatch({ type:CartActionTypes.REMOVE_CART_ITEM_SUCCESS , payload:response.data });
        }
        catch(error)
        {
            console.log("Error : Remove Cart Item from Cart by User : ",error);
            dispatch({ type:CartActionTypes.REMOVE_CART_ITEM_FAILURE , payload:error.message });
        }
    };
};

export const clearCartAction = () => {
    return async (dispatch) => {
        dispatch({ type:CartActionTypes.CLEAR_CART_REQUEST });
        try{
            const response = await api.put("/api/user/cart/clear", {} , {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            });

            
            console.log("Success : Clear Cart by User : ",response.data);
            dispatch({ type:CartActionTypes.CLEAR_CART_SUCCESS , payload:response.data });
        }
        catch(error)
        {
            console.log("Error : Clear Cart by User : ",error);
            dispatch({ type:CartActionTypes.CLEAR_CART_FAILURE , payload:error.message });
        }
    };
};
