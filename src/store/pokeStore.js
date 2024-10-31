import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const usePokeStore = create(
   devtools(
      persist(
         (set) => ({
            loading: false,
            allPokemons: [],
            pokemons: [],
            selectedPokemon: null,
            error: null,
            nextUrl: null,
            prevUrl: null,
            count: 0,

            getAllPokemons: async () => { // New method to fetch all Pokémon
               set({ loading: true });
               try {
                  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
                  const data = await response.json();
                  set({
                     allPokemons: data.results, // Store all Pokémon here
                     count: data.count,
                     loading: false,
                  });
               } catch (error) {
                  set({ error: error.message, loading: false });
               }
            },

            getPokemons: async (url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20') => {
               set({ loading: true });
               try {
                  const response = await fetch(url);
                  const data = await response.json();
                  set({
                     pokemons: data.results,
                     nextUrl: data.next,
                     prevUrl: data.previous,
                     count: data.count,
                     loading: false,
                  });
               } catch (error) {
                  set({ error: error.message, loading: false });
               }
            },

            getSelectedPokemon: async (selectedPokemon) => {
               set({ loading: true });
               try {
                  const response = await fetch(
                     `https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`
                  );
                  const data = await response.json();
                  set({ selectedPokemon: data, loading: false });
               } catch (error) {
                  set({ error: error.message, loading: false });
               }
            }
         }),
         { name: 'Pokemon' }
      )
   )
);

export default usePokeStore;
