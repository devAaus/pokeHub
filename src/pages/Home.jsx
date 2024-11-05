import React, { useEffect, useState } from 'react';
import PokeCard from '../components/PokeCard';
import usePokeStore from '../store/pokeStore';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';

const Home = () => {
   const { pokemons, getPokemons, nextUrl, prevUrl } = usePokeStore();
   const [pokeData, setPokeData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null); // Added error state

   useEffect(() => {
      const fetchData = async () => {
         setLoading(true);
         setError(null); // Reset error state
         try {
            await getPokemons();
         } catch (error) {
            setError('Failed to load Pokémon data.');
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, [getPokemons]); // Added getPokemons to the dependency array

   useEffect(() => {
      const getPokemonData = async () => {
         if (pokemons.length > 0) {
            setLoading(true);
            try {
               const pokemonPromises = pokemons.map(async (item) => {
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
               setError('Error fetching Pokémon data');
               console.error('Error fetching Pokémon data:', error);
            } finally {
               setLoading(false);
            }
         }
      };
      getPokemonData();
   }, [pokemons]);

   const handleNextPage = () => {
      if (nextUrl) {
         getPokemons(nextUrl);
      }
   };

   const handlePrevPage = () => {
      if (prevUrl) {
         getPokemons(prevUrl);
      }
   };

   const hasNext = nextUrl !== null;
   const hasPrev = prevUrl !== null;

   if (loading) return <Loader />;
   if (error) return <div>{error}</div>; // Display error message

   return (
      <main>
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
            {pokeData.map((p) => (
               <PokeCard key={p.id} p={p} /> // Use unique ID for the key
            ))}
         </div>

         <Pagination
            handleNext={handleNextPage}
            handlePrev={handlePrevPage}
            prevDisabled={!hasPrev}
            nextDisabled={!hasNext}
            total={pokeData.length}
         />
      </main>
   );
};

export default Home;
