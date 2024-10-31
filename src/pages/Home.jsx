import React from 'react';
import PokeCard from '../components/PokeCard';

const Home = ({
   filteredPokeData,
   currentPage,
   totalPages,
   onPageChange
}) => {
   return (
      <main>
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
            {filteredPokeData.map((p, i) => (
               <PokeCard key={i} p={p} />
            ))}
         </div>

         {/* Pagination Controls */}
         {filteredPokeData.length > 30 && <div className="join flex justify-center items-center my-4">
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
         </div>}
      </main>
   );
};

export default Home;