// const categorizeIngredients = (ingredients) => {
//     return ingredients.reduce((acc,ingredient) => {
//         const {category} = ingredient;
//         if(!acc[category.name]){
//             acc[category.name] = [];
//         }
//         acc[category.name].push(ingredient);
//         return acc;
//     },{})
// };

// export default categorizeIngredients;

const groupIngredientsByCategory = (ingredients) => {
    const groupedMap = ingredients.reduce((acc, ingredient) => {
        const categoryId = ingredient.category.id;

        // If the category doesn't exist in our map yet, create it
        if (!acc[categoryId]) {
            acc[categoryId] = {
                category: ingredient.category,
                foodIngredients: []
            };
        }

        // Push the ingredient (without the nested category property) into its category group
        acc[categoryId].foodIngredients.push({
            id: ingredient.id,
            name: ingredient.name,
            isStock: ingredient.isStock
        });

        return acc;
    }, {});

    // Convert the map object back into an array
    return Object.values(groupedMap);
};

export default groupIngredientsByCategory;

// input format for the groupIngredientsByCategory()

// const ingredients = [
//     {
//         category: {
//             id: 1,
//             name:"Toppings"
//         },
//         id:1,
//         name:"Onion",
//         isStock: true
//     },
//     {
//         category: {
//             id: 1,
//             name:"Toppings"
//         },
//         id:2,
//         name:"Chilly flayks",
//         isStock: true
//     },
//     {
//         category: {
//             id: 2,
//             name:"Vegetables & Protiens"
//         },
//         id:3,
//         name:"Potato",
//         isStock: true
//     },
//     {
//         category: {
//             id: 2,
//             name:"Vegetables & Protiens"
//         },
//         id:4,
//         name:"Tomato",
//         isStock: true
//     },
//     {
//         category: {
//             id: 3,
//             name:"Herbs"
//         },
//         id:5,
//         name:"Coriander Leaves",
//         isStock: true
//     },
//     {
//         category: {
//             id: 1,
//             name:"Toppings"
//         },
//         id:6,
//         name:"Powdered Pepper",
//         isStock: true
//     }
// ]


// Output will be like array of objects 

// const answer = [
//     {
//         category:{
//             id:1,
//             name:"Toppings"
//         },
//         foodIngredients:[
//             {
//                 id:1,
//                 name:"Onion",
//                 isStock: true
//             },
//             {
//                 id:2,
//                 name:"Chilly flayks",
//                 isStock: true
//             },
//             {
//                 id:6,
//                 name:"Powdered Pepper",
//                 isStock: true
//             }
//         ]
//     },
//     {
//         category:{
//             id:2,
//             name:"Vegetables & Protiens"
//         },
//         foodIngredients:[
//             {
//                 id:3,
//                 name:"Potato",
//                 isStock: true
//             },
//             {
//                 id:4,
//                 name:"Tomato",
//                 isStock: true
//             }
//         ]
//     },
//     {
//         category:{
//             id:3,
//             name:"Herbs"
//         },
//         foodIngredients:[
//             {
//                 id:5,
//                 name:"Corriander Leaves",
//                 isStock: true
//             }
//         ]
//     }
// ]