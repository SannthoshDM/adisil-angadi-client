import * as RestaurantActionTypes from "./RestaurantActionType";

const initialState = {
    restaurants: [],
    usersRestaurant: null,
    restaurant: null,
    isLoading: false,
    error: null,
    events: [],
    restaurantsEvents: [],
    categories: []
};

const restaurantReducer = (state = initialState, action) => {

    switch (action.type) {
        case RestaurantActionTypes.CREATE_RESTAURANT_REQUEST:
        case RestaurantActionTypes.GET_ALL_RESTAURANTS_REQUEST:
        case RestaurantActionTypes.DELETE_RESTAURANT_REQUEST:
        case RestaurantActionTypes.UPDATE_RESTAURANT_REQUEST:
        case RestaurantActionTypes.GET_RESTAURANT_BY_ID_REQUEST:
        case RestaurantActionTypes.CREATE_CATEGORY_REQUEST:
        case RestaurantActionTypes.GET_RESTAURANTS_CATEGORY_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case RestaurantActionTypes.CREATE_RESTAURANT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                usersRestaurant:action.payload
            };
        case RestaurantActionTypes.GET_ALL_RESTAURANTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                restaurants: action.payload
            };
        case RestaurantActionTypes.GET_RESTAURANT_BY_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                restaurant: action.payload
            };
        case RestaurantActionTypes.GET_RESTAURANT_BY_USER_ID_SUCCESS:
        case RestaurantActionTypes.UPDATE_RESTAURANT_STATUS_SUCCESS:
        case RestaurantActionTypes.UPDATE_RESTAURANT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                usersRestaurant: action.payload
            };
        case RestaurantActionTypes.DELETE_RESTAURANT_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                restaurants: state.restaurants.filter(
                    (item) => item.id !== action.payload
                ),
                usersRestaurant: state.usersRestaurant.filter(
                    (item) => item.id !== action.payload
                )
            };
        case RestaurantActionTypes.CREATE_EVENTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                events: [...state.events, action.payload],
                restaurantsEvents: [...state.restaurantsEvents, action.payload]
            };
        case RestaurantActionTypes.GET_ALL_EVENTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                events: action.payload
            };
        case RestaurantActionTypes.GET_RESTAURANTS_EVENTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                restaurantsEvents: action.payload
            };
        case RestaurantActionTypes.DELETE_EVENTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                events: state.events.filter(
                    (item) => item.id !== action.payload
                ),
                restaurantsEvents: state.restaurantsEvents.filter(
                    (item) => item.id !== action.payload
                )
            };
        case RestaurantActionTypes.CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                categories: [...state.categories,action.payload]
            };
        case RestaurantActionTypes.GET_RESTAURANTS_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                categories: action.payload
            };
        case RestaurantActionTypes.CREATE_RESTAURANT_FAILURE:
        case RestaurantActionTypes.GET_ALL_RESTAURANTS_FAILURE:
        case RestaurantActionTypes.DELETE_RESTAURANT_FAILURE:
        case RestaurantActionTypes.UPDATE_RESTAURANT_FAILURE:
        case RestaurantActionTypes.GET_RESTAURANT_BY_ID_FAILURE:
        case RestaurantActionTypes.CREATE_EVENTS_FAILURE:
        case RestaurantActionTypes.CREATE_CATEGORY_FAILURE:
        case RestaurantActionTypes.GET_RESTAURANTS_CATEGORY_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
    
        default:
            return state;
    }
};

export default restaurantReducer;