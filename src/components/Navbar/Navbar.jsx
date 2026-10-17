import { Avatar, Badge, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { Person } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const Navbar = () => {

  const {auth,cart} = useSelector(store=>store);
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    if(auth.user?.role === "ROLE_CUSTOMER")
    {
      navigate("/my-profile")
    }
    else{
      navigate("/admin/restaurant")
    }
  }

  console.log("INSIDE NAV BAR ----------- : cart : ",cart);
  console.log("INSIDE NAV BAR =========== : auth : ",auth);

  return (
    <div className='px-5 sticky top-0 z-50 py-[.8rem] bg-[#8ec42f] lg:px-20 flex justify-between'>
      <div className='lg:mr-10 cursor-pointer flex items-center space-x-4'>
        <li onClick={() => navigate("/") } className='logo font-semibold text-[#f4f6ec] text-2xl'>
          Adisil Angadi
        </li>
      </div>
      <div className='flex items-center space-x-2 lg:space-x-10'>
        <div className=''>
          <IconButton>
            <SearchIcon sx={{fontSize:"1.5rem"}}></SearchIcon>
          </IconButton>
        </div>
        <div>
          { auth.user ? (
              <Avatar onClick={handleAvatarClick} sx={{bgcolor:"white",color:"#8ec42f"}}>
                {auth.user?.name[0].toUpperCase()}
              </Avatar> 
            ): ( 
              <IconButton onClick={() => navigate("/account/login")}>
                <Person />
              </IconButton> 
            )
          }
        </div>
        <div className=''>
          <IconButton onClick={() => navigate("/cart")}>
            {/* here in Badge the "color:secondary" will be taken from DarkTheme file in Theme folder */}
            <Badge badgeContent={cart.cart?.item.length} color='secondary'>
              <ShoppingCartIcon sx={{fontSize:"1.5rem"}}></ShoppingCartIcon>
            </Badge>
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Navbar;