import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Authentication/AuthReducer";
import { thunk } from "redux-thunk";
import restaurantReducer from "./Restaurant/RestaurantReducer";
import menuItemReducer from "./Menu/MenuReducer";
import cartReducer from "./Cart/CartReducer";
import { orderReducer } from "./Order/OrderReducer";
import restaurantsOrderReducer from "./RestaurantOrder/RestaurantOrderReducer";
import { ingredientReducer } from "./Ingredients/IngredientsReducer";


const rootReducer = combineReducers({
    auth:authReducer,
    restaurant:restaurantReducer,
    menu:menuItemReducer,
    cart:cartReducer,
    order:orderReducer,
    restaurantOrder: restaurantsOrderReducer,
    ingredients: ingredientReducer

});

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk));