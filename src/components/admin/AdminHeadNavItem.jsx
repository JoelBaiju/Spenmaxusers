import React from 'react'
import { Link } from 'react-router-dom'

const AdminHeadNavItem = ({ icon, text, to, notificationCount, onClickFuntion }) => {
  const handleNotificationClick = () => {
    console.log('here');
    if (notificationCount > 0) {
      onClickFuntion();
    }
  };
  
  return (
    <Link to={to} className="flex flex-col items-center px-2 py-2 mt-2 relative md:mt-0 cursor-pointer">
      <img src={icon} alt={text} className='w-4 h-4' onClick={handleNotificationClick} />
      <p className='text-black text-xs font-sans ml-2'  onClick={handleNotificationClick}>{text}</p>
      {notificationCount > 0 && (
        <span  onClick={handleNotificationClick} className="absolute top-0 right-6 bg-red-500 text-black rounded-full w-4 h-4 flex justify-center items-center text-xs"> {notificationCount} </span>
      )}
    </Link>
  )
}

export default AdminHeadNavItem
