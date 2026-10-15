import { api, API_URL } from "../../config/api";
import * as IngredientsActionTypes from "./IngredientsActionType";


export const getIngredientsOfRestaurant = ({restaurantId, token}) => {
    return async (dispatch) => {
        // dispatch({ type: IngredientsActionTypes. });
        try{
            const response = await api.get(
                `/api/admin/ingredients/restaurant/${restaurantId}`, 
                { 
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            
            console.log("Success : Get All Restaurant Ingredients : ",response.data);
            dispatch({ type:IngredientsActionTypes.GET_INGREDIENTS , payload:response.data });
        }
        catch(error)
        {
            console.log("Error : Get All Restaurant Ingredients : ",error);
            // dispatch({ type:IngredientsActionTypes. , payload:error });
        }
    };
};


export const createIngredient = ({ data, token}) => {
    return async (dispatch) => {
        // dispatch({ type:IngredientsActionTypes.CREATE_INGREDIENT_REQUEST });
        try{
            const response = await api.post(
                `/api/admin/ingredients`, 
                data ,
                { 
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            
            console.log("Success : Create Ingredients of the Category : ",response.data);
            dispatch({ type:IngredientsActionTypes.CREATE_INGREDIENT_SUCCESS , payload:response.data });
        }
        catch(error)
        {
            console.log("Error : Create Ingredients of the Category : ",error);
            // dispatch({ type:IngredientsActionTypes.CREATE_INGREDIENT_FAILURE , payload:error });
        }
    };
};


export const createIngredientCategory = ({ data, token}) => {
    return async (dispatch) => {
        // dispatch({ type:IngredientsActionTypes.CREATE_INGREDIENT_CATEGORY_REQUEST });
        try{
            const response = await api.post(
                `/api/admin/ingredients/category`, 
                data ,
                { 
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            
            console.log("Success : Create Ingredient Category by Restaurant Owner : ",response.data);
            dispatch({ type:IngredientsActionTypes.CREATE_INGREDIENT_CATEGORY_SUCCESS , payload:response.data });
        }
        catch(error)
        {
            console.log("Error : Create Ingredient Category by Restaurant Owner : ",error);
            // dispatch({ type:IngredientsActionTypes.CREATE_INGREDIENT_CATEGORY_FAILURE , payload:error });
        }
    };
};


export const getIngredientCategories = ({restaurantId, token}) => {
    return async (dispatch) => {
        // dispatch({ type:IngredientsActionTypes.GET_INGREDIENT_CATEGORY_REQUEST });
        try{
            const response = await api.get(
                `/api/admin/ingredients/restaurant/${restaurantId}/category`, 
                { 
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            
            console.log("Success : Get Ingredient Categories BY Restaurant : ",response.data);
            dispatch({ type:IngredientsActionTypes.GET_INGREDIENT_CATEGORY_SUCCESS , payload:response.data });
        }
        catch(error)
        {
            console.log("Error : Get Ingredient Categories BY Restaurant : ",error);
            // dispatch({ type:IngredientsActionTypes.GET_INGREDIENT_CATEGORY_FAILURE , payload:error });
        }
    };
};


export const updateStockOfIngredient = ({ ingredientItemId, token }) => {
    return async (dispatch) => {
        // dispatch({ type:IngredientsActionTypes. });
        try{
            const response = await api.put(
                `/api/admin/ingredients/${ingredientItemId}/updateStock`, 
                {},
                { 
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            
            console.log("Success : Update Ingredient Availability by Restaurant Owner: ",response.data);
            dispatch({ type:IngredientsActionTypes.UPDATE_STOCK , payload:response.data });
        }
        catch(error)
        {
            console.log("Error : Update Ingredient Availability by Restaurant Owner: ",error);
            // dispatch({ type:IngredientsActionTypes. , payload:error });
        }
    };
};