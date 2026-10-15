import { api, API_URL } from "../../config/api";
import * as RestaurantActionType from "./RestaurantActionType";


// RESTAURANT ACTIONS

export const getAllRestaurantsAction = (token) => {
    console.log("insdie getAllRestaurant method .....",token);

    return async (dispatch) => {
        dispatch({type:RestaurantActionType.GET_ALL_RESTAURANTS_REQUEST});
        try{
            const { data } = await api.get("/api/user/restaurants",{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });

            dispatch({type:RestaurantActionType.GET_ALL_RESTAURANTS_SUCCESS,payload:data});
            console.log("Success : Get all Restaurants for user : ",data);
        }
        catch(error)
        {
            dispatch({type:RestaurantActionType.GET_ALL_RESTAURANTS_FAILURE,payload:error});
            console.log("Error : Get all Restaurant for user : ",error);
        }
    }
}


export const getRestaurantById = (reqData) => {
    return async (dispatch) => {
        dispatch({type:RestaurantActionType.GET_RESTAURANT_BY_ID_REQUEST});
        try{
            const response = await api.get(`/api/user/restaurants/${reqData.restaurantId}`,{
                headers:{
                    Authorization: `Bearer ${reqData.token}`,
                },
            });

            dispatch({type:RestaurantActionType.GET_RESTAURANT_BY_ID_SUCCESS,payload:response.data});
            console.log("Success : Get Restaurant by ID for user : ",response.data);
        }
        catch(error)
        {
            dispatch({type:RestaurantActionType.GET_RESTAURANT_BY_ID_FAILURE,payload:error});
            console.log("Error : Get Restaurant by ID for user : ",error);
        }
    }
}


export const getRestaurantByUserId = (token) => {
    return async (dispatch) => {
        dispatch({type:RestaurantActionType.GET_RESTAURANT_BY_USER_ID_REQUEST});
        try{
            const response = await api.get(`/api/admin/restaurant`,{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });

            dispatch({type:RestaurantActionType.GET_RESTAURANT_BY_USER_ID_SUCCESS,payload:response.data});
            console.log("Success : Get Restaurant for OWNER : ",response.data);
        }
        catch(error)
        {
            dispatch({type:RestaurantActionType.GET_RESTAURANT_BY_USER_ID_FAILURE,payload:error.message});
            console.log("Error : Get Restaurant for OWNER : ",error);
        }
    }
}


export const createRestaurant = (reqData) => {

    console.log("In RestaurantAction -> Create Restaurant : ",reqData);
    return async (dispatch) => {
        dispatch({type:RestaurantActionType.CREATE_RESTAURANT_REQUEST});
        try{
            const response = await api.post(`/api/admin/restaurant`,reqData.data,{
                headers:{
                    Authorization: `Bearer ${reqData.token}`,
                },
            });

            dispatch({type:RestaurantActionType.CREATE_RESTAURANT_SUCCESS,payload:response.data});
            console.log("Success : Create Restaurant by OWNER : ",response.data);
        }
        catch(error)
        {
            dispatch({type:RestaurantActionType.CREATE_RESTAURANT_FAILURE,payload:error});
            console.log("Error : Create Restaurant by OWNER : ",error);
        }
    }
}


export const updateRestaurant = ({restaurantId, restaurantData, token }) => {
    return async (dispatch) => {
        dispatch({type:RestaurantActionType.UPDATE_RESTAURANT_REQUEST});
        try{
            const response = await api.put(`/api/admin/restaurant/${restaurantId}`,restaurantData,{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });

            dispatch({type:RestaurantActionType.UPDATE_RESTAURANT_SUCCESS,payload:response.data});
            console.log("Success : Update Restaurant by OWNER : ",response.data);
        }
        catch(error)
        {
            dispatch({type:RestaurantActionType.UPDATE_RESTAURANT_FAILURE,payload:error});
            console.log("Error : Update Restaurant by OWNER : ",error);
        }
    }
}


export const deleteRestaurant = ({ restaurantId, token}) => {
    return async (dispatch) => {
        dispatch({type:RestaurantActionType.DELETE_RESTAURANT_REQUEST});
        try{
            const response = await api.delete(`/api/admin/restaurant/${restaurantId}`,{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });

            dispatch({type:RestaurantActionType.DELETE_RESTAURANT_SUCCESS,payload:restaurantId});
            console.log("Success : Delete Restaurant by OWNER : ",response.data);
        }
        catch(error)
        {
            dispatch({type:RestaurantActionType.DELETE_RESTAURANT_FAILURE,payload:error});
            console.log("Error : Delete Restaurant by OWNER : ",error);
        }
    }
}


export const updateRestaurantStatus = ({ restaurantId, token}) => {
    return async (dispatch) => {
        dispatch({type:RestaurantActionType.UPDATE_RESTAURANT_STATUS_REQUEST});
        try{
            const response = await api.put(`/api/admin/restaurant/${restaurantId}/status`,{},{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });

            dispatch({type:RestaurantActionType.UPDATE_RESTAURANT_STATUS_SUCCESS,payload:response.data});
            console.log("Success : Update Restaurant Status by OWNER : ",response.data);
        }
        catch(error)
        {
            dispatch({type:RestaurantActionType.UPDATE_RESTAURANT_STATUS_FAILURE,payload:error});
            console.log("Error : Update Restaurant Status by OWNER : ",error);
        }
    }
}

// RESTAURANT EVENT ACTIONS

export const createEventAction = ({ data, token, restaurantId}) => {
    return async (dispatch) => {
        dispatch({type:RestaurantActionType.CREATE_EVENTS_REQUEST});
        try{
            const response = await api.post(`/api/admin/events/restaurant/${restaurantId}`,data,{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });

            dispatch({type:RestaurantActionType.CREATE_EVENTS_SUCCESS,payload:response.data});
            console.log("Success : Create Events for Restaurant by OWNER : ",response.data);
        }
        catch(error)
        {
            dispatch({type:RestaurantActionType.CREATE_EVENTS_FAILURE,payload:error});
            console.log("Error : Create Events for Restaurant by OWNER : ",error);
        }
    }
}

export const getAllEvents = ({token}) => {
    return async (dispatch) => {
        dispatch({type:RestaurantActionType.GET_ALL_EVENTS_REQUEST});
        try{
            const response = await api.get(`/api/user/events`,{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });

            dispatch({type:RestaurantActionType.GET_ALL_EVENTS_SUCCESS,payload:response.data});
            console.log("Success : Get Events for Users : ",response.data);
        }
        catch(error)
        {
            dispatch({type:RestaurantActionType.GET_ALL_EVENTS_FAILURE,payload:error});
            console.log("Error : Get Events for Users : ",error);
        }
    }
}

export const deleteEventAction = ({ eventId, token}) => {
    return async (dispatch) => {
        dispatch({type:RestaurantActionType.DELETE_EVENTS_REQUEST});
        try{
            const response = await api.delete(`/api/admin/events/${eventId}`,{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });

            dispatch({type:RestaurantActionType.DELETE_EVENTS_SUCCESS,payload: eventId});
            console.log("Success : Delete Events by Restaurant OWNER : ",response.data);
        }
        catch(error)
        {
            dispatch({type:RestaurantActionType.DELETE_EVENTS_FAILURE,payload:error});
            console.log("Error : Delete Events by Restaurant OWNER : ",error);
        }
    }
}

export const getRestaurantsEvents = ({ restaurantId, token}) => {
    return async (dispatch) => {
        dispatch({type:RestaurantActionType.GET_RESTAURANTS_EVENTS_REQUEST});
        try{
            const response = await api.get(`/api/admin/events/restaurant/${restaurantId}`,{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });

            dispatch({type:RestaurantActionType.GET_RESTAURANTS_EVENTS_SUCCESS,payload:response.data});
            console.log("Success : Get Events of Restaurant for OWNER : ",response.data);
        }
        catch(error)
        {
            dispatch({type:RestaurantActionType.GET_RESTAURANTS_EVENTS_FAILURE,payload:error});
            console.log("Error : Get Events of Restaurant for OWNER : ",error);
        }
    }
}

// FOOD CATEGORY ACTION

export const createCategoryAction = ({ reqData, token}) => {
    return async (dispatch) => {
        dispatch({type:RestaurantActionType.CREATE_CATEGORY_REQUEST});
        try{
            const response = await api.post(`/api/admin/category`,reqData,{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });

            dispatch({type:RestaurantActionType.CREATE_CATEGORY_SUCCESS,payload:response.data});
            console.log("Success : Create Food Category by Restaurant OWNER : ",response.data);
        }
        catch(error)
        {
            dispatch({type:RestaurantActionType.CREATE_CATEGORY_FAILURE,payload:error});
            console.log("Error : Create Food Category by Restaurant OWNER : ",error);
        }
    }
}


export const getRestaurantsCategory = ({ restaurantId, token}) => {
    return async (dispatch) => {
        dispatch({type:RestaurantActionType.GET_RESTAURANTS_CATEGORY_REQUEST});
        try{
            const response = await api.get(`/api/admin/category/restaurant/${restaurantId}`,{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });

            dispatch({type:RestaurantActionType.GET_RESTAURANTS_CATEGORY_SUCCESS,payload:response.data});
            console.log("Success : Get Food Category by Restaurant OWNER : ",response.data);
        }
        catch(error)
        {
            dispatch({type:RestaurantActionType.GET_RESTAURANTS_CATEGORY_FAILURE,payload:error});
            console.log("Error : Get Food Category by Restaurant OWNER : ",error);
        }
    }
}

export const getRestaurantsCategoryForUsers = ({ restaurantId, token}) => {
    return async (dispatch) => {
        dispatch({type:RestaurantActionType.GET_RESTAURANTS_CATEGORY_REQUEST});
        try{
            const response = await api.get(`/api/user/restaurants/${restaurantId}/categories`,{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });

            dispatch({type:RestaurantActionType.GET_RESTAURANTS_CATEGORY_SUCCESS,payload:response.data});
            console.log("Success : Get Food Category by User : ",response.data);
        }
        catch(error)
        {
            dispatch({type:RestaurantActionType.GET_RESTAURANTS_CATEGORY_FAILURE,payload:error});
            console.log("Error : Get Food Category by User : ",error);
        }
    }
}