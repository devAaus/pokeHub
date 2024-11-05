import React from 'react';
import PokeCard from '../components/PokeCard';

const SearchPage = ({ filteredPokeData }) => {
   return (
      <main>
         <h2 className="text-2xl font-semibold text-center my-4">Search Results</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {filteredPokeData.length > 0 ? (
               filteredPokeData.map((p, i) => (
                  <PokeCard key={i} p={p} />
               ))
            ) : (
               <p className="text-center col-span-full">No Pokémon found.</p>
            )}
         </div>
      </main>
   );
};

export default SearchPage;
