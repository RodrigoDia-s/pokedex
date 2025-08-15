import React from 'react';
import { Grid, Box, Typography, Fade } from '@mui/material';
import { ListPokemon } from '../interface/pokemon.interface';
import PokemonCard from './PokemonCard';

interface PokemonListProps {
  pokemons: ListPokemon[];
  onPokemonClick?: (pokemonName: string) => void;
}

const PokemonList = ({ pokemons, onPokemonClick }: PokemonListProps) => {
  if (!pokemons || pokemons.length === 0) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        py: 8,
        color: 'rgba(255,255,255,0.7)',
        fontSize: '1.2rem'
      }}>
        <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.8)' }}>
          Nenhum Pokémon encontrado
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, color: 'rgba(255,255,255,0.6)' }}>
          Tente ajustar os filtros ou carregue mais Pokémon
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
      {pokemons.map((pokemon, index) => (
        <Grid item xs={6} sm={6} md={4} lg={3} key={pokemon.name}>
          <Fade in timeout={300 + index * 100}>
            <Box sx={{
              animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
              '@keyframes slideInUp': {
                '0%': { opacity: 0, transform: 'translateY(30px) scale(0.95)' },
                '100%': { opacity: 1, transform: 'translateY(0) scale(1)' }
              }
            }}>
              <PokemonCard 
                pokemon={pokemon} 
                onClick={() => onPokemonClick?.(pokemon.name)}
              />
            </Box>
          </Fade>
        </Grid>
      ))}
    </Grid>
  );
};

export default PokemonList;