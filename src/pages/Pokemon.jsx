import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import usePokeStore from '../store/pokeStore';
import Type from '../components/Type';
import MoveCard from '../components/MoveCard';
import Loader from '../components/Loader';

const Pokemon = () => {
   const { id } = useParams();
   const { selectedPokemon, getSelectedPokemon, loading } = usePokeStore();
   const [evolutionChain, setEvolutionChain] = useState(null);

   useEffect(() => {
      if (id) {
         getSelectedPokemon(id);
      }
   }, [id, getSelectedPokemon]);

   useEffect(() => {
      const fetchEvolutionChain = async () => {
         if (selectedPokemon?.species?.url) {
            try {
               const speciesResponse = await fetch(selectedPokemon.species.url);
               const speciesData = await speciesResponse.json();
               const evolutionResponse = await fetch(speciesData.evolution_chain.url);
               const evolutionData = await evolutionResponse.json();
               setEvolutionChain(evolutionData);
            } catch (error) {
               console.error('Error fetching evolution chain:', error);
            }
         }
      };

      fetchEvolutionChain();
   }, [selectedPokemon]);

   if (loading) {
      return <Loader />;
   }

   if (!selectedPokemon) {
      return <div className="text-gray-300">No Pokémon found.</div>;
   }

   const { id: pokemonId, name, weight, height, abilities, types, moves, stats, sprites } = selectedPokemon;
   const formattedId = String(pokemonId).padStart(3, '0');
   const weightWithDecimals = (weight / 10).toFixed(1);
   const heightWithDecimals = (height / 10).toFixed(1);

   const renderEvolutionChain = (chain) => {
      if (!chain) return null;

      const evolutions = [];
      let current = chain.chain;

      while (current) {
         evolutions.push(current.species.name);
         current = current.evolves_to[0];
      }

      return (
         <div>
            <h1 className="text-2xl font-bold text-white">Evolution Chain</h1>
            {evolutions.map((evo, index) => (
               <span key={index} className="text-gray-300 font-normal rounded-lg text-lg me-2">
                  {evo.charAt(0).toUpperCase() + evo.slice(1)}{index < evolutions.length - 1 ? ' -> ' : ''}
               </span>
            ))}
         </div>
      );
   };

   return (
      <main>
         <div className="card">
            <figure>
               <img
                  src={sprites?.other['official-artwork'].front_default}
                  alt={name}
                  className='w-60 h-60 object-contain'
               />
            </figure>
            <div className="card-body">
               <h2 className="card-title text-3xl uppercase flex md:justify-center mb-3">
                  #{formattedId} <span>{name}</span>
               </h2>
               <div>
                  {types?.map((type, index) => (
                     <Type key={index} type={type.type.name} index={index} />
                  ))}
               </div>
               <div className='my-5 grid md:grid-cols-2 gap-2'>
                  <div>
                     <h1 className="text-2xl font-bold text-white">Weight</h1>
                     <span className='text-lg font-normal text-gray-300'>{weightWithDecimals}kg</span>
                  </div>
                  <div>
                     <h1 className="text-2xl font-bold text-white">Height</h1>
                     <span className='text-lg font-normal text-gray-300'>{heightWithDecimals}m</span>
                  </div>
                  <div>
                     <h1 className="text-2xl font-bold text-white">Abilities</h1>
                     {abilities?.map((ability, index) => (
                        <span key={index} className="text-gray-300 font-normal rounded-lg text-lg">
                           {index > 0 ? ', ' : ''}{ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}
                        </span>
                     ))}
                  </div>
                  {renderEvolutionChain(evolutionChain)}
               </div>
               <div>
                  <h1 className="text-2xl font-bold text-white">Stats</h1>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                     {stats?.map((stat, index) => (
                        <h3 key={index} className="text-gray-300 rounded-lg text-lg font-semibold capitalize">
                           {stat.stat.name}: <span>{stat.base_stat}</span>
                        </h3>
                     ))}
                  </div>
               </div>
               <div className='my-5'>
                  <h1 className="mb-3 text-2xl font-bold text-white">Moves</h1>
                  <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
                     {moves?.map((move, index) => (
                        <MoveCard key={index} move={move.move} />
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </main>
   );
};

export default Pokemon;
