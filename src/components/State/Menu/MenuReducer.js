import * as MenuActionTypes from "./MenuActionType";


const initialState = {
    menuItems: [],
    isLoading: false,
    error: null,
    search: [],
    message: null
}

const menuItemReducer = (state = initialState, action) => {

    switch (action.type) {
        case MenuActionTypes.CREATE_MENU_ITEM_REQUEST:
        case MenuActionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST:
        case MenuActionTypes.DELETE_MENU_ITEM_REQUEST:
        case MenuActionTypes.SEARCH_MENU_ITEM_REQUEST:
        case MenuActionTypes.UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
                message: null
            };
        case MenuActionTypes.CREATE_MENU_ITEM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                menuItems: [...state.menuItems, action.payload],
                message: "Food Created Successfully"
            };
        case MenuActionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                menuItems: action.payload
            };
        case MenuActionTypes.DELETE_MENU_ITEM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                menuItems: state.menuItems.filter(
                    (menuItem) => menuItem.id !== action.payload
                )
            };
        case MenuActionTypes.UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                menuItems: state.menuItems.map(
                    (menuItem) => menuItem.id === action.payload.id ? action.payload : menuItem
                )
            };
        case MenuActionTypes.SEARCH_MENU_ITEM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                search: action.payload
            };

        case MenuActionTypes.CREATE_MENU_ITEM_FAILURE:
        case MenuActionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE:
        case MenuActionTypes.DELETE_MENU_ITEM_FAILURE:
        case MenuActionTypes.SEARCH_MENU_ITEM_FAILURE:
        case MenuActionTypes.UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                message: null
            };
    
        default:
            return state;
    }
};

export default menuItemReducer;