import { api } from "../../config/api";

import * as MenuActionTypes from "./MenuActionType"



export const createMenuItem = ({ menu, token }) => {
    return async (dispatch) => {
        dispatch({ type: MenuActionTypes.CREATE_MENU_ITEM_REQUEST });
        try{
            const response = await api.post("/api/admin/food", menu, {
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Success : Created Food by Restaurant Owner : ",response.data);
            dispatch({ type: MenuActionTypes.CREATE_MENU_ITEM_SUCCESS , payload: response.data });
        }
        catch(error)
        {
            console.log("Error : Created Food by Restaurant Owner : ",error);
            dispatch({ type: MenuActionTypes.CREATE_MENU_ITEM_FAILURE , payload: error });
        }
    }
}


export const getMenuItemsByRestaurantId = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: MenuActionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });
        try{

            const response = await api.get(
                `/api/user/foods/restaurant/${reqData.restaurantId}` , 
                {
                    headers:{
                        Authorization: `Bearer ${reqData.token}`,
                    },
                }
            );

            console.log("Success : Get Menu Items for Restaurant Id : ",response.data);
            dispatch({ type: MenuActionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS , payload: response.data });
        }
        catch(error)
        {
            console.log("Error : Get Menu Items for Restaurant Id : ",error);
            dispatch({ type: MenuActionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE , payload: error });
        }
    }
}

export const filterMenuItemsByisVegetarian = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: MenuActionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });
        try{

            const response = await api.get(
                `/api/user/foods/restaurant/${reqData.restaurantId}/isVegetarian?isVegetarian=${reqData.vegetarian}&foodCategory=${reqData.foodCategory}&keyword=${reqData.keyword}` , 
                {
                    headers:{
                        Authorization: `Bearer ${reqData.token}`,
                    },
                }
            );

            console.log("Success : Filter Menu Items for Restaurant Id by Vegetarian: ",response.data);
            dispatch({ type: MenuActionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS , payload: response.data });
        }
        catch(error)
        {
            console.log("Error : Filter Menu Items for Restaurant Id by Vegetarian: ",error);
            dispatch({ type: MenuActionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE , payload: error });
        }
    }
}


export const filterMenuItemsByisSeasonal = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: MenuActionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });
        try{

            const response = await api.get(
                `/api/user/foods/restaurant/${reqData.restaurantId}/isSeasonal?isSeasonal=${reqData.seasonal}&foodCategory=${reqData.foodCategory}&keyword=${reqData.keyword}` , 
                {
                    headers:{
                        Authorization: `Bearer ${reqData.token}`,
                    },
                }
            );

            console.log("Success : Filter Menu Items for Restaurant Id by Seasonal: ",response.data);
            dispatch({ type: MenuActionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS , payload: response.data });
        }
        catch(error)
        {
            console.log("Error : Filter Menu Items for Restaurant Id by Seasonal : ",error);
            dispatch({ type: MenuActionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE , payload: error });
        }
    }
}


export const filterMenuItemsBySearch = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: MenuActionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });
        try{
            
            const response = await api.get(
                `/api/user/foods/restaurant/${reqData.restaurantId}/search?foodCategory=${reqData.foodCategory}&keyword=${reqData.keyword}` ,  
                {
                    headers:{
                        Authorization: `Bearer ${reqData.token}`,
                    },
                }
            );

            console.log("Success : Filter Menu Items for Restaurant Id : ",response.data);
            dispatch({ type: MenuActionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS , payload: response.data });
        }
        catch(error)
        {
            console.log("Error : Filter Menu Items for Restaurant Id : ",error);
            dispatch({ type: MenuActionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE , payload: error });
        }
    }
}



// export const searchMenuItem = ({ keyword, token }) => {
//     return async (dispatch) => {
//         dispatch({ type: MenuActionTypes.SEARCH_MENU_ITEM_REQUEST });
//         try{
//             const response = await api.get(`/api/user/foods/search?keyword=${keyword}` , {
//                 headers:{
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             console.log("Success : Search Menu Items by User : ",response.data);
//             dispatch({ type: MenuActionTypes.SEARCH_MENU_ITEM_SUCCESS , payload: response.data });
//         }
//         catch(error)
//         {
//             console.log("Error : Search Menu Items by User : ",error);
//             dispatch({ type: MenuActionTypes.SEARCH_MENU_ITEM_FAILURE , payload: error });
//         }
//     }
// }


// export const getAllIngredientsOfMenuItem = (reqData) => {
//     return async (dispatch) => {
//         dispatch({ type: MenuActionTypes.GE });
//         try{
//             const response = await api.get("" , {
//                 headers:{
//                     Authorization: `Bearer ${reqData.token}`,
//                 },
//             });

//             console.log("Success :  : ",response.data);
//             dispatch({ type: MenuActionTypes. , payload: response.data });
//         }
//         catch(error)
//         {
//             console.log("Error :  : ",error);
//             dispatch({ type: MenuActionTypes. , payload: error });
//         }
//     }
// }


export const updateMenuItemsAvailability = ({ foodId, token }) => {
    return async (dispatch) => {
        dispatch({ type: MenuActionTypes.UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST });
        try{
            const response = await api.put(`/api/admin/food/${foodId}/updateFoodAvailability` , {} , {
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Success : Update Food Availability by Restaurant Owner : ",response.data);
            dispatch({ type: MenuActionTypes.UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS , payload: response.data });
        }
        catch(error)
        {
            console.log("Error : Update Food Availability by Restaurant Owner : ",error);
            dispatch({ type: MenuActionTypes.UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE , payload: error });
        }
    }
}


export const deleteFoodAction = ({ foodId, token }) => {
    return async (dispatch) => {
        dispatch({ type: MenuActionTypes.DELETE_MENU_ITEM_REQUEST });
        try{
            const response = await api.delete(`/api/admin/food/${foodId}` , {
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Success : Delete Food by Restaurant Owner : ",response.data);
            dispatch({ type: MenuActionTypes.DELETE_MENU_ITEM_SUCCESS , payload: foodId });
        }
        catch(error)
        {
            console.log("Error : Delete Food by Restaurant Owner : ",error);
            dispatch({ type: MenuActionTypes.DELETE_MENU_ITEM_FAILURE , payload: error });
        }
    }
}

