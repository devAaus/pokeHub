import React from 'react';
import logo from '../assets/logo.png';
import { useLocation } from 'react-router-dom';

const Navbar = ({ onSearch, search, setSearch }) => {
   const location = useLocation();

   const handleSearchKeyPress = (e) => {
      if (e.key === 'Enter' && onSearch) {
         onSearch(search);
      }
   };

   return (
      <div className="navbar bg-base-100 flex-col lg:flex-row">
         <div className="flex-1">
            <a href="/" className="btn btn-ghost hover:bg-transparent h-20 text-xl">
               <img src={logo} alt="logo" className="w-32 h-20 object-contain" />
            </a>
         </div>
         {location.pathname === '/' && (
            <div className="flex-none gap-2">
               <div className="form-control flex">
                  <input
                     type="text"
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                     onKeyDown={handleSearchKeyPress}
                     placeholder="Search"
                     className="input input-bordered input-primary w-full max-w-xs"
                  />
               </div>
            </div>
         )}
      </div>
   );
};

export default Navbar;
