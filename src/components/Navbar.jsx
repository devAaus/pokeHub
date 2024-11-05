import React, { useEffect, useState, useCallback } from 'react';
import logo from '../assets/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
   const [search, setSearch] = useState('');
   const navigate = useNavigate();
   const location = useLocation();

   useEffect(() => {
      const query = new URLSearchParams(location.search).get('query');
      if (query) {
         setSearch(query);
      }
   }, [location.search]);

   const handleSearchKeyPress = useCallback((e) => {
      if (e.key === 'Enter' && search.trim()) { // Check for non-empty search
         navigate(`/search?query=${search}`);
      }
   }, [search, navigate]);

   return (
      <div className="navbar bg-base-100 flex-col lg:flex-row">
         <div className="flex-1">
            <a href="/" className="btn btn-ghost hover:bg-transparent h-20 text-xl">
               <img src={logo} alt="logo" className="w-32 h-20 object-contain" />
            </a>
         </div>
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
      </div>
   );
};

export default Navbar;
