import React, { lazy, Suspense, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Loader from './components/Loader';
import usePokeStore from './store/pokeStore';

const Home = lazy(() => import("./pages/Home"));
const Pokemon = lazy(() => import("./pages/Pokemon"));

const App = () => {
  const { allPokemons, getAllPokemons, loading } = usePokeStore();
  const [pokeData, setPokeData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 21;

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
    setCurrentPage(1);
  };

  useEffect(() => {
    getAllPokemons();
  }, [getAllPokemons]);

  useEffect(() => {
    if (allPokemons.length > 0) {
      const getPokemonData = async () => {
        try {
          const pokemonPromises = allPokemons.map(async (item) => {
            const response = await fetch(item.url);
            const data = await response.json()
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
  }, [allPokemons]);

  const filteredPokeData = pokeData.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredPokeData.length / itemsPerPage);

  const currentData = filteredPokeData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="max-w-5xl mx-auto md:py-0 px-2">
      <Router>
        <Navbar onSearch={handleSearch} />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home
                  filteredPokeData={currentData}
                  loading={loading}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              }
            />
            <Route path="/pokemon/:id" element={<Pokemon />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
