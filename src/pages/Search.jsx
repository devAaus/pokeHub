import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import PokeCard from '../components/PokeCard';
import Loader from '../components/Loader';
import usePokeStore from '../store/pokeStore';
import Pagination from '../components/Pagination';

const ITEMS_PER_PAGE = 21;

const Search = () => {
   const location = useLocation();
   const query = new URLSearchParams(location.search).get('query');
   const { allPokemons, getAllPokemons } = usePokeStore();
   const [pokeData, setPokeData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [currentPage, setCurrentPage] = useState(1);

   useEffect(() => {
      const fetchAllPokemons = async () => {
         setLoading(true);
         try {
            await getAllPokemons();
         } catch (err) {
            setError('Failed to load Pokémon data.');
         } finally {
            setLoading(false);
         }
      };
      fetchAllPokemons();
   }, [getAllPokemons]);

   useEffect(() => {
      const getPokemonData = async () => {
         setLoading(true);
         if (allPokemons.length > 0) {
            try {
               const pokemonPromises = allPokemons.map(async (item) => {
                  const response = await fetch(item.url);
                  const data = await response.json();
                  return {
                     id: data.id,
                     image: data.sprites?.other['official-artwork'].front_default,
                     name: data.name,
                  };
               });

               const pokemonData = await Promise.all(pokemonPromises);
               setPokeData(pokemonData);
            } catch (error) {
               setError('Error fetching Pokémon data.');
               console.error('Error fetching Pokémon data:', error);
            } finally {
               setLoading(false);
            }
         }
      };
      getPokemonData();
   }, [allPokemons]);

   // Memoized filtered data based on query
   const filteredPokeData = useMemo(() => {
      if (query) {
         return pokeData.filter((p) =>
            p.name.toLowerCase().includes(query.toLowerCase())
         );
      }
      return pokeData;
   }, [query, pokeData]);

   const totalPages = Math.ceil(filteredPokeData.length / ITEMS_PER_PAGE);

   const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
   };

   const indexOfLastPoke = currentPage * ITEMS_PER_PAGE;
   const indexOfFirstPoke = indexOfLastPoke - ITEMS_PER_PAGE;
   const currentPokeData = filteredPokeData.slice(indexOfFirstPoke, indexOfLastPoke);

   if (loading) return <Loader />;
   if (error) return <div>{error}</div>; // Display error message

   return (
      <>
         <h1 className='text-3xl font-bold text-center mb-4'>Search Results for "{query}"</h1>
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
            {currentPokeData.length > 0 ? (
               currentPokeData.map((p) => (
                  <PokeCard key={p.id} p={p} />
               ))
            ) : (
               <p>No results found for "{query}"</p>
            )}
         </div>
         {/* Pagination Controls */}
         {filteredPokeData.length > ITEMS_PER_PAGE && (
            <Pagination
               handleNext={() => handlePageChange(currentPage + 1)}
               handlePrev={() => handlePageChange(currentPage - 1)}
               prevDisabled={currentPage === 1}
               nextDisabled={currentPage === totalPages}
               total={currentPokeData.length}
            />
         )}
      </>
   );
};

export default Search;
