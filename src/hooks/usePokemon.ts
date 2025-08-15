import { useState } from "react";
import { httpClient } from "../api/httpClient";
import { DetailPokemon } from "../interface/pokemon.interface";

const usePokemon = () => {
  const [pokemon, setPokemon] = useState<DetailPokemon | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPokemon = async (pokemonUrl: string) => {
    setIsLoading(true);
    try {
      const result = await httpClient.get<DetailPokemon>(pokemonUrl);
      if (result?.data) {
        // Generate a simple color based on pokemon ID for consistency
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];
        const color = colors[result.data.id % colors.length];
        setPokemon({ ...result.data, color });
      }
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    pokemon,
    isLoading,
    fetchPokemon,
  };
};

export default usePokemon;