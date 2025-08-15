import { useEffect, useState, useCallback } from "react";
import { httpClient } from "../api/httpClient";
import {
  POKEMON_API_POKEMON_URL,
  POKEMON_IMAGES_BASE_URL,
  POKEMON_TYPES,
} from "../constants";
import {
  IndexedPokemon,
  IndexedType,
  ListPokemon,
  PokemonByTypeListResponse,
  PokemonListResponse,
} from "../interface/pokemon.interface";

const usePokemons = () => {
  const [allPokemons, setAllPokemons] = useState<ListPokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<ListPokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(
    `${POKEMON_API_POKEMON_URL}?limit=20`
  );
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const indexedPokemonToListPokemon = useCallback((indexedPokemon: IndexedPokemon) => {
    const pokedexNumber = parseInt(
      indexedPokemon.url
        .replace(`${POKEMON_API_POKEMON_URL}/`, "")
        .replace("/", "")
    );

    const listPokemon: ListPokemon = {
      name: indexedPokemon.name,
      url: indexedPokemon.url,
      image: `${POKEMON_IMAGES_BASE_URL}/${pokedexNumber}.png`,
      pokedexNumber,
    };

    return listPokemon;
  }, []);

  const fetchPokemon = useCallback(async () => {
    if (nextUrl && !loading) {
      setLoading(true);
      try {
        const result = await httpClient.get<PokemonListResponse>(nextUrl);
        if (result?.data?.results) {
          const listPokemons = result.data.results.map((p) =>
            indexedPokemonToListPokemon(p)
          );
          setAllPokemons(prev => {
            // Prevent duplicates by checking if Pokemon already exists
            const existingIds = new Set(prev.map(p => p.pokedexNumber));
            const newPokemons = listPokemons.filter(p => !existingIds.has(p.pokedexNumber));
            return [...prev, ...newPokemons];
          });
          setNextUrl(result.data.next);
        }
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      } finally {
        setLoading(false);
      }
    }
  }, [nextUrl, indexedPokemonToListPokemon]);

  const fetchPokemonsByTypes = useCallback(async (types: string[]) => {
    if (types.length === 0) {
      setFilteredPokemons(allPokemons);
      return;
    }

    // Clear current filtered list immediately
    setFilteredPokemons([]);
    setLoading(true);
    try {
      const typePromises = types.map(type =>
        httpClient.get<PokemonByTypeListResponse>(`https://pokeapi.co/api/v2/type/${type}`)
      );
      
      const results = await Promise.all(typePromises);
      
      // Get intersection of all types (Pokemon that have ALL selected types)
      let pokemonSets = results.map(result => 
        result?.data?.pokemon?.map(p => indexedPokemonToListPokemon(p.pokemon)) || []
      );

      let intersection: ListPokemon[] = [];
      if (pokemonSets.length === 1) {
        intersection = pokemonSets[0];
      } else {
        // Find Pokemon that appear in all type sets
        intersection = pokemonSets[0].filter(pokemon =>
          pokemonSets.every(set => 
            set.some(p => p.pokedexNumber === pokemon.pokedexNumber)
          )
        );
      }

      // Sort by pokedex number
      intersection.sort((a, b) => a.pokedexNumber - b.pokedexNumber);
      setFilteredPokemons(intersection);
    } catch (error) {
      console.error('Error fetching Pokemon by types:', error);
      setFilteredPokemons([]);
    } finally {
      setLoading(false);
    }
  }, [allPokemons, indexedPokemonToListPokemon]);

  // Initial fetch - only once
  useEffect(() => {
    if (allPokemons.length === 0) {
      fetchPokemon();
    }
  }, []);

  // Update filtered pokemons when selectedTypes change
  useEffect(() => {
    if (selectedTypes.length === 0) {
      setFilteredPokemons(allPokemons);
    } else {
      fetchPokemonsByTypes(selectedTypes);
    }
  }, [selectedTypes, allPokemons, fetchPokemonsByTypes]);

  // No separate effect needed - handled above

  const handleTypeFilter = useCallback((types: string[]) => {
    setSelectedTypes(types);
  }, []);

  return {
    pokemons: filteredPokemons,
    fetchNextPage: fetchPokemon,
    hasMorePokemon: !!nextUrl && selectedTypes.length === 0,
    pokemonTypes: POKEMON_TYPES.map(type => type.name),
    selectedTypes,
    onTypeFilter: handleTypeFilter,
    loading,
    setPokemons: setAllPokemons,
  };
};

export default usePokemons;