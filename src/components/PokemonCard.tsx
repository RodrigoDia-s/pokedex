import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { ListPokemon } from '../interface/pokemon.interface';

interface PokemonCardProps {
  pokemon: ListPokemon;
  onClick: () => void;
}

const playPokemonSound = (pokemonId: number) => {
  try {
    const audio = new Audio(`https://play.pokemonshowdown.com/audio/cries/${pokemonId}.mp3`);
    audio.volume = 0.3;
    audio.play().catch(() => {
      // Fallback: try alternative sound source
      const fallbackAudio = new Audio(`https://pokemoncries.com/cries/${pokemonId}.mp3`);
      fallbackAudio.volume = 0.3;
      fallbackAudio.play().catch(() => {
        console.log('Pokemon sound not available');
      });
    });
  } catch (error) {
    console.log('Error playing Pokemon sound:', error);
  }
};

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
  const handleClick = () => {
    playPokemonSound(pokemon.pokedexNumber);
    onClick();
  };

  // Generate vibrant gradient colors based on pokemon ID
  const getCardGradient = (id: number) => {
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      'linear-gradient(135deg, #ff8a80 0%, #ea80fc 100%)',
      'linear-gradient(135deg, #8fd3f4 0%, #84fab0 100%)'
    ];
    return gradients[id % gradients.length];
  };

  const cardGradient = getCardGradient(pokemon.pokedexNumber);
  const accentColor = pokemon.pokedexNumber % 2 === 0 ? '#667eea' : '#f5576c';

  return (
    <Card
      onClick={handleClick}
      sx={{
        cursor: 'pointer',
        borderRadius: '24px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        height: { xs: '240px', sm: '260px', md: '280px' },
        display: 'flex',
        flexDirection: 'column',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '6px',
          background: cardGradient,
          borderRadius: '24px 24px 0 0'
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: -50,
          right: -50,
          width: 100,
          height: 100,
          background: cardGradient,
          borderRadius: '50%',
          opacity: 0.1,
          transition: 'all 0.4s ease'
        },
        '&:hover': {
          transform: { xs: 'translateY(-8px) scale(1.02)', md: 'translateY(-12px) scale(1.03)' },
          boxShadow: `0 25px 50px rgba(0, 0, 0, 0.2), 0 0 30px ${accentColor}22`,
          animation: 'cardPulse 0.6s ease-in-out',
          '@keyframes cardPulse': {
            '0%': { transform: 'translateY(0) scale(1)' },
            '50%': { transform: 'translateY(-6px) scale(1.02)' },
            '100%': { transform: 'translateY(-12px) scale(1.03)' }
          },
          '&::after': {
            transform: 'scale(1.5)',
            opacity: 0.2
          },
          '& .pokemon-image': {
            transform: 'scale(1.1) rotate(5deg)'
          },
          '& .pokemon-number': {
            transform: 'scale(1.1)'
          }
        }
      }}
    >
      <CardContent sx={{ 
        p: { xs: 2, md: 3 }, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        position: 'relative',
        zIndex: 2
      }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: 2,
          width: '100%'
        }}>
          <Chip
            className="pokemon-number"
            label={`#${pokemon.pokedexNumber.toString().padStart(3, '0')}`}
            size="small"
            sx={{
              background: cardGradient,
              color: 'white',
              fontWeight: 700,
              fontSize: '0.8rem',
              fontFamily: '"Poppins", sans-serif',
              letterSpacing: '1px',
              px: 2,
              py: 0.5,
              borderRadius: '20px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              transition: 'transform 0.3s ease'
            }}
          />
          
          <Box
            component="img"
            src={pokemon.image}
            alt={pokemon.name}
            className="pokemon-image"
            sx={{
              width: { xs: 100, sm: 120, md: 140 },
              height: { xs: 100, sm: 120, md: 140 },
              objectFit: 'contain',
              filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
        </Box>
        
        <Box sx={{ textAlign: 'center', width: '100%' }}>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 800,
              background: cardGradient,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textTransform: 'capitalize',
              fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
              letterSpacing: '0.5px',
              fontFamily: '"Poppins", sans-serif',
              mb: 0.5
            }}
          >
            {pokemon.name}
          </Typography>
          
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(0,0,0,0.6)',
              fontSize: { xs: '0.75rem', md: '0.85rem' },
              fontWeight: 500,
              fontFamily: '"Poppins", sans-serif'
            }}
          >
            Toque para explorar
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
