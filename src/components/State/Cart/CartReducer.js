import { LOGOUT } from "../Authentication/AuthActionType";
import * as CartActionTypes from "./CartActionType";

const initialState = {
    cart: null,
    // cartItems: [],
    isLoading: false,
    error: null
};

const cartReducer = (state = initialState, action) => {

    switch (action.type) {
        case CartActionTypes.FIND_CART_REQUEST:
        case CartActionTypes.GET_ALL_CART_ITEMS_REQUEST:
        case CartActionTypes.UPDATE_CART_ITEM_REQUEST:
        case CartActionTypes.REMOVE_CART_ITEM_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case CartActionTypes.FIND_CART_SUCCESS:
        case CartActionTypes.CLEAR_CART_SUCCESS:
            return {
                ...state,
                isLoading: false,
                cart: action.payload,
                // cartItems: action.payload.item
            };
        case CartActionTypes.ADD_ITEM_TO_CART_SUCCESS:
            return {
                ...state,
                isLoading: false,
                cart: action.payload,
                // cartItems: [action.payload, ...state.cartItems]
            };
        case CartActionTypes.UPDATE_CART_ITEM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                cart: action.payload,
                // cartItems: state.cartItems.map(
                //     (item) => item.id === action.payload.id ? action.payload : item
                // )
            };
        case CartActionTypes.REMOVE_CART_ITEM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                cart: action.payload,
                // cartItems: state.cartItems.filter (
                //     (item) => item.id !== action.payload
                // )
            };
        case CartActionTypes.FIND_CART_FAILURE:
        case CartActionTypes.UPDATE_CART_ITEM_FAILURE:
        case CartActionTypes.REMOVE_CART_ITEM_FAILURE:
        // case CartActionTypes.GET_ALL_CART_ITEMS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
            
        case LOGOUT:
            localStorage.removeItem("jwt");
            return {
                ...state,
                // cartItems:[],
                cart: null,
                success: "Logout success"
            }
    
        default:
            return state;
    }
};

export default cartReducer;