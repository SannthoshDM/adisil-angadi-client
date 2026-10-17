export const isPresentInFavorites=(favorites,restaurant)=>{
    for(let item of favorites){
        if(restaurant.id === item.id){
            return true;
        }
    }
    return false;
}

export const isPresentInUserAddress=(reduxUserAddress,address)=>{
    for(let item of reduxUserAddress){
        if(address.id === item.id){
            return true;
        }
    }
    return false;
}