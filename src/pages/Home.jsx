import React from 'react';
import PokeCard from '../components/PokeCard';

const Home = ({
   filteredPokeData,
   onPageChange,
   hasNext,
   hasPrev,
   searchQuery
}) => {
   return (
      <main>
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
            {filteredPokeData.map((p, i) => (
               <PokeCard key={i} p={p} />
            ))}
         </div>

         {/* Floating Pagination Controls */}
         {!searchQuery && <div className=" fixed -translate-x-2/4 flex gap-2 z-10 shadow-[0_4px_8px_rgba(0,0,0,0.1)] px-4 py-2 rounded-lg left-2/4 bottom-1">
            <button
               className="join-item btn"
               onClick={onPageChange.prev}
               disabled={!hasPrev}
            >
               « Previous
            </button>
            <span className="join-item btn">Page Navigation</span>
            <button
               className="join-item btn"
               onClick={onPageChange.next}
               disabled={!hasNext}
            >
               » Next
            </button>
         </div>}
      </main>
   );
};

export default Home;
