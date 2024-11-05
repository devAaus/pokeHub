import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from './components/Loader';
import Navbar from './components/Navbar';

const Home = lazy(() => import("./pages/Home"));
const Pokemon = lazy(() => import("./pages/Pokemon"));
const Search = lazy(() => import("./pages/Search"));

const App = () => {
  return (
    <div className="max-w-5xl mx-auto md:py-0 px-2">
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<Pokemon />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={() => <h1>404 Not Found</h1>} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
