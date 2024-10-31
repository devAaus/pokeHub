import React from 'react';
import PokeCard from '../components/pokeCard';

const Home = ({
   filteredPokeData,
   currentPage,
   totalPages,
   onPageChange
}) => {
   return (
      <main>
         <div className="join flex justify-center items-center my-4">
            <button
               className="join-item btn"
               onClick={() => onPageChange(currentPage - 1)}
               disabled={currentPage === 1}
            >
               «
            </button>
            <button className="join-item btn">
               Page {currentPage} of {totalPages}
            </button>
            <button
               className="join-item btn"
               onClick={() => onPageChange(currentPage + 1)}
               disabled={currentPage === totalPages}
            >
               »
            </button>
         </div>
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
            {filteredPokeData.map((p, i) => (
               <PokeCard key={i} p={p} />
            ))}
         </div>

         {/* Pagination Controls */}
         {/* {filteredPokeData.length > 10 && <div className='flex justify-between items-center my-4'>
            <button
               onClick={() => getPokemons(prevUrl)}
               disabled={!prevUrl || loading}
               className='px-4 py-2 mx-2 bg-blue-500 text-white rounded disabled:bg-gray-400'
            >
               Previous
            </button>
            <button
               onClick={() => getPokemons(nextUrl)}
               disabled={!nextUrl || loading}
               className='px-4 py-2 mx-2 bg-blue-500 text-white rounded disabled:bg-gray-400'
            >
               Next
            </button>
         </div>} */}

      </main>
   );
};

export default Home;