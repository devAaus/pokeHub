import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { useLocation } from 'react-router-dom';

const Navbar = ({ onSearch }) => {
   const [search, setSearch] = useState('');
   const location = useLocation();

   const handleSearch = (e) => {
      const value = e.target.value;
      setSearch(value);

      // Call onSearch while typing
      if (onSearch) {
         onSearch(value);
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
               <div className="form-control">
                  <input
                     type="text"
                     value={search}
                     onChange={handleSearch}
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
