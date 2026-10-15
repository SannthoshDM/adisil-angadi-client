import React, { useEffect } from 'react'
import OrderCard from './OrderCard';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUsersOrders } from '../State/Order/OrderAction';


const orderItems = [1,1,1,1,1];

const Orders = () => {
  
  const { auth, order } = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getUsersOrders(token));
  },[auth.token])

  return (
    <div className='flex px-7 flex-col'>
      <h1 className='text-xl text-center py-7 font-semibold'>My Orders</h1>
      <div className='space-y-5'>
        {
          order.orders?.map((item) => (
            <OrderCard item={item}/>
          ))
        }
        
      </div>
    </div>
  );
}

export default Orders;