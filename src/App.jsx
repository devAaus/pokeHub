import React, { lazy, Suspense, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Loader from './components/Loader';
import usePokeStore from './store/pokeStore';

const Home = lazy(() => import("./pages/Home"));
const Pokemon = lazy(() => import("./pages/Pokemon"));

const App = () => {
  const { allPokemons, pokemons, getPokemons, getAllPokemons, loading, nextUrl, prevUrl } = usePokeStore();
  const [pokeData, setPokeData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [search, setSearch] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  useEffect(() => {
    getAllPokemons();
    getPokemons();
  }, [getAllPokemons, getPokemons]);

  useEffect(() => {
    const sourceData = searchQuery ? allPokemons : pokemons;

    if (sourceData.length > 0) {
      const getPokemonData = async () => {
        try {
          const pokemonPromises = sourceData.map(async (item) => {
            const response = await fetch(item.url);
            const data = await response.json();
            return {
              id: data.id,
              image: data.sprites?.other['official-artwork'].front_default,
              name: data.name
            };
          });

          const pokemonData = await Promise.all(pokemonPromises);
          setPokeData(pokemonData);
        } catch (error) {
          console.error('Error fetching Pokemon data:', error);
        }
      };
      getPokemonData();
    }
  }, [pokemons, allPokemons, searchQuery]);


  const filteredPokeData = pokeData.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchQuery)
  );

  // Pagination controls using nextUrl and prevUrl
  const handleNextPage = () => {
    if (nextUrl) {
      getPokemons(nextUrl);  // Fetches the next batch of Pokémon
    }
  };

  const handlePrevPage = () => {
    if (prevUrl) {
      getPokemons(prevUrl);  // Fetches the previous batch of Pokémon
    }
  };

  return (
    <div className="max-w-5xl mx-auto md:py-0 px-2">
      <Navbar onSearch={handleSearch} search={search} setSearch={setSearch} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                filteredPokeData={filteredPokeData.length > 0 ? filteredPokeData : pokeData}
                loading={loading}
                onPageChange={{ next: handleNextPage, prev: handlePrevPage }}
                hasNext={!!nextUrl}
                hasPrev={!!prevUrl}
                searchQuery={searchQuery}
              />
            }
          />
          <Route path="/pokemon/:id" element={<Pokemon />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
