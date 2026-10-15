import * as OrderActionTypes from "./OrderActionType";

const initialState = {
    isLoading: false,
    orders: [],
    error: null,
    notifications: []
};

export const orderReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case OrderActionTypes.GET_USERS_ORDERS_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true
            };
        case OrderActionTypes.GET_USERS_ORDERS_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                orders: payload
            };
        // case OrderActionTypes.GET_USERS_NOTIFICATION_SUCCESS:
        //     return {
        //         ...state,
        //         notifications: payload,
        //         error: null,
        //         isLoading: false
        //     };
        case OrderActionTypes.GET_USERS_ORDERS_FAILURE:
            return {
                ...state,
                error: payload,
                isLoading: false
            };
            
            
        default:
            return state;
    }
};