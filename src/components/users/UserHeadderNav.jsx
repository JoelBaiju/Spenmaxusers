import React from 'react';
import { Link } from 'react-router-dom';

const UserHeadderNav = ({ icon, text, to, notificationCount, onClickFuntion }) => {

  const handleNotificationClick = () => {
    if (notificationCount > 0) {
      onClickFuntion();
    }
  };
  const c = 2

  return (
    <Link to={to} className="flex flex-col items-center relative px-2 py-2 mt-2 md:mt-0 cursor-pointer">
      <img src={icon} alt={text} className='w-4 h-4' onClick={handleNotificationClick} />
      <p className='text-[#404040] text-xs font-sans ml-2'>{text}</p>
      {notificationCount > 0 && (
        <span className="absolute top-0 right-6 bg-red-500 text-white rounded-full w-4 h-4 flex justify-center items-center text-xs"> {notificationCount} </span>
      )}
    </Link>
  );
};

export default UserHeadderNav;
