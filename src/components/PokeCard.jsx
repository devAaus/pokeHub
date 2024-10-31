import React from 'react'
import { Link } from 'react-router-dom';

const PokeCard = ({ p }) => {
   const formattedId = String(p.id).padStart(3, '0');

   return (
      <div className="card card-compact bg-base-100 shadow-xl border-4 border-blue-900  hover:rotate-1 hover:scale-105 transition-all duration-300">
         <Link to={`/pokemon/${p.id}`}>
            <figure>
               <img
                  src={p.sprites?.other['official-artwork'].front_default}
                  alt={p.name}
               />
            </figure>
            <div className="card-body">
               <h2 className="card-title uppercase flex justify-center text-center">
                  #{formattedId} <br />
                  {p.name}
               </h2>
            </div>
         </Link>
      </div>
   )
}

export default PokeCard