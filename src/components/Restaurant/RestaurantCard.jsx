import { Card, Chip, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite } from '../State/Authentication/AuthAction';
import { isPresentInFavorites } from '../config/logic';


const RestaurantCard = ({item}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem("jwt");
    const {auth} = useSelector(store => store);
    const restaurantId = item.id;

    const handleAddToFavorite = () => {
        console.log("Add to favorites is clicked .....");
        dispatch(addToFavorite(token,restaurantId));
    }

    const handleNavigateToRestaurant = () => {
        if(item.open)
        {
            navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`);
        }
    }

  return (
    <Card key={item.id} className='w-[15rem]'>
        <div className={`${item.open ? 'cursor-pointer' : "cursor-not-allowed"} relative`}>
            <img className='w-full h-[15rem] rounded-t-md object-cover'  src={item.images[0]} alt="" />
            <Chip 
                size='small' 
                className='absolute top-2 left-2' 
                color={item.open ? "success" : "error"}
                label={item.open ? "open" : "closed"}
            />
        </div>
        <div className={`${item.open ? 'cursor-pointer' : "cursor-not-allowed"} p-4 textPart lg:flex w-full justify-between`}>
            <div onClick={handleNavigateToRestaurant} className='space-y-1' >
                <p className='font-semibold text-lg'>{item.name}</p>
                <p className='text-gray-500 text-sm line-clamp-4'>
                    {item.description}
                </p>
            </div>
        </div>
        <div >
            <IconButton onClick={handleAddToFavorite}>
                {isPresentInFavorites(auth.favorites,item)?<FavoriteIcon/>:<FavoriteBorderIcon/>}
            </IconButton>
        </div>
    </Card>
  );
}

export default RestaurantCard;