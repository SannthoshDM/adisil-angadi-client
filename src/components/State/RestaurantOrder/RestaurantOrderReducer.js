import * as RestaurantOrderActionTypes from "./RestaurantOrderActionType";

const initialState = {
    isLoading: false,
    error: null,
    orders: []
};

const restaurantsOrderReducer = (state = initialState, action) => {

    switch (action.type) {
        case RestaurantOrderActionTypes.GET_RESTAURANT_ORDER_REQUEST:
        case RestaurantOrderActionTypes.UPDATE_ORDER_STATUS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case RestaurantOrderActionTypes.GET_RESTAURANT_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                orders: action.payload
            };
        case RestaurantOrderActionTypes.UPDATE_ORDER_STATUS_SUCCESS:
            const updateOrders = state.orders.map(
                (order) => order.id === action.payload.id ? action.payload : order
            );
            return {
                ...state,
                isLoading: false,
                orders: updateOrders
            };
        case RestaurantOrderActionTypes.GET_RESTAURANT_ORDER_FAILURE:
        case RestaurantOrderActionTypes.UPDATE_ORDER_STATUS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
    
        default:
            return state;
    }
};

export default restaurantsOrderReducer;