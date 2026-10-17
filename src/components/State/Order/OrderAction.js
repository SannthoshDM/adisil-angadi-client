import { api, API_URL } from "../../config/api";
import { CLEAR_CART_SUCCESS } from "../Cart/CartActionType";
import * as OrderActionTypes from "./OrderActionType";


export const createOrder = (reqData) => {
    return async (dispatch) => {
        dispatch({ type:OrderActionTypes.CREATE_ORDER_REQUEST });
        try{
            const response = await api.post("/api/user/order", reqData.order ,{
                headers:{
                    Authorization: `Bearer ${reqData.token}`,
                },
            });

            // if(response.data.payment_url)
            // {
            //     window.location.href = response.data.payment_url;
            // }

            
            console.log("Success : Created Order by User : ",response.data);
            dispatch({ type:OrderActionTypes.CREATE_ORDER_SUCCESS , payload:response.data });
            dispatch({ type:CLEAR_CART_SUCCESS, payload:null});
        }
        catch(error)
        {
            console.log("Error : Created Order by User : ",error);
            dispatch({ type:OrderActionTypes.CREATE_ORDER_FAILURE , payload:error });
        }
    };
};


export const getUsersOrders = (token) => {
    return async (dispatch) => {
        dispatch({ type:OrderActionTypes.GET_USERS_ORDERS_REQUEST });
        try{
            const response = await api.get("/api/user/orders",{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });

            
            console.log("Success : Get All Orders of the User : ",response.data);
            dispatch({ type:OrderActionTypes.GET_USERS_ORDERS_SUCCESS , payload:response.data });
        }
        catch(error)
        {
            console.log("Error : Get All Orders of the User : ",error);
            dispatch({ type:OrderActionTypes.GET_USERS_ORDERS_FAILURE , payload:error });
        }
    };
};


// export const getUsersNotificationAction = (token) => {
//     return async (dispatch) => {
//         dispatch({ type:OrderActionTypes.GET_USERS_NOTIFICATION_REQUEST });
//         try{
//             const response = await api.get("/api/user/notifications",{
//                 headers:{
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

            
//             console.log("Success :  : ",response.data);
//             dispatch({ type:OrderActionTypes.GET_USERS_NOTIFICATION_SUCCESS , payload:response.data });
//         }
//         catch(error)
//         {
//             console.log("Error :  : ",error);
//             dispatch({ type:OrderActionTypes.GET_USERS_NOTIFICATION_FAILURE , payload:error });
//         }
//     };
// };

