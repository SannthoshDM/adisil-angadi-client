import { api, API_URL } from "../../config/api";
import * as RestaurantOrderActionTypes from "./RestaurantOrderActionType";


export const getRestaurantOrder = ({ restaurantId, orderStatus, token}) => {
    return async (dispatch) => {
        dispatch({ type:RestaurantOrderActionTypes.GET_RESTAURANT_ORDER_REQUEST });
        try{
            const response = await api.get(
                `/api/admin/orders/${restaurantId}`, 
                { 
                    params: { orderStatus : orderStatus } ,
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            
            console.log("Success : Get Restaurant Orders for Owner : ",response.data);
            dispatch({ type:RestaurantOrderActionTypes.GET_RESTAURANT_ORDER_SUCCESS , payload:response.data });
        }
        catch(error)
        {
            console.log("Error : Get Restaurant Orders for Owner : ",error);
            dispatch({ type:RestaurantOrderActionTypes.GET_RESTAURANT_ORDER_FAILURE , payload:error });
        }
    };
};


export const updateOrderStatus = ({orderId, orderStatus, token}) => {
    return async (dispatch) => {
        dispatch({ type:RestaurantOrderActionTypes.UPDATE_ORDER_STATUS_REQUEST });
        try{
            const response = await api.put(`/api/admin/order/${orderId}/${orderStatus}`, {} ,{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });

            
            console.log("Success : Updated Order Status by Restaurant Owner : ",response.data);
            dispatch({ type:RestaurantOrderActionTypes.UPDATE_ORDER_STATUS_SUCCESS , payload:response.data });
        }
        catch(error)
        {
            console.log("Error : Updated Order Status by Restaurant Owner : ",error);
            dispatch({ type:RestaurantOrderActionTypes.UPDATE_ORDER_STATUS_FAILURE , payload:error });
        }
    };
};