import { AdminPanelSettings, Category, Dashboard, Event, Fastfood, Logout, ShoppingBag } from '@mui/icons-material';
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../components/State/Authentication/AuthAction';


const sideBarItems = [
    {
        title: "Dashboard",
        icon: <Dashboard />,
        path: "/"
    },
    {
        title: "Orders",
        icon: <ShoppingBag />,
        path: "/orders"
    },
    {
        title: "Menu",
        icon: <ShopTwoIcon />,
        path: "/menu"
    },
    {
        title: "Food Category",
        icon: <Category />,
        path: "/category"
    },
    {
        title: "Ingredients",
        icon: <Fastfood />,
        path: "/ingredients"
    },
    {
        title: "Events",
        icon: <Event />,
        path: "/events"
    },
    {
        title: "Details",
        icon: <AdminPanelSettings />,
        path: "/details"
    },
    {
        title: "Logout",
        icon: <Logout />,
        path: "/"
    }
]

const AdminSideBar = ({ handleClose }) => {

    const isSmallScreen = useMediaQuery("(max-width:1080px)");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigate = (item) => {
        navigate(`/admin/restaurant${item.path}`)

        if( item.title === "Logout")
        {
            navigate("/");
            dispatch(logout());
            handleClose();
        }
    }

  return (
    <div>
        <>
            <Drawer 
                variant={isSmallScreen ? "temporary":"permanent"}
                onClose={handleClose} 
                open={true} 
                anchor="left" 
                sx={{zIndex:1}}
            >
               <div className='w-[70vw] lg:w-[20vw] h-screen flex flex-col justify-center text-xl gap-6.5 pt-12'>
                    {
                        sideBarItems.map((item, i) => (
                            <Fragment key={i}>
                                <div 
                                    onClick={() => handleNavigate(item)} 
                                    className='px-5 flex items-center gap-5 cursor-pointer'
                                >
                                    {item.icon}
                                    <span>{item.title}</span>
                                </div>
                                { i !== sideBarItems.length-1 && <Divider /> }
                            </Fragment>
                        ))
                    }
               </div>
            </Drawer>
        </>
    </div>
  );
}

export default AdminSideBar;