import React from 'react';
import { Box, Chip, Typography, IconButton, Fade } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

interface PokemonFiltersProps {
  onTypeFilter: (types: string[]) => void;
  selectedTypes: string[];
  pokemonTypes: string[];
}

const PokemonFilters: React.FC<PokemonFiltersProps> = ({ 
  onTypeFilter, 
  selectedTypes, 
  pokemonTypes 
}) => {
  const handleTypeClick = (type: string) => {
    const newSelectedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    
    onTypeFilter(newSelectedTypes);
  };

  const handleClearAll = () => {
    onTypeFilter([]);
  };

  const getTypeColor = (type: string) => {
    const typeColors: { [key: string]: string } = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC'
    };
    return typeColors[String(type).toLowerCase()] || '#68A090';
  };

  const getTypeNameInPortuguese = (type: string) => {
    const typeTranslations: { [key: string]: string } = {
      'normal': 'Normal',
      'fire': 'Fogo',
      'water': 'Água',
      'electric': 'Elétrico',
      'grass': 'Planta',
      'ice': 'Gelo',
      'fighting': 'Lutador',
      'poison': 'Veneno',
      'ground': 'Terra',
      'flying': 'Voador',
      'psychic': 'Psíquico',
      'bug': 'Inseto',
      'rock': 'Pedra',
      'ghost': 'Fantasma',
      'dragon': 'Dragão',
      'dark': 'Sombrio',
      'steel': 'Aço',
      'fairy': 'Fada'
    };
    return typeTranslations[type] || type.charAt(0).toUpperCase() + type.slice(1);
  };

  const getTypeGradient = (type: string) => {
    const typeColor = getTypeColor(type);
    return `linear-gradient(135deg, ${typeColor}, ${typeColor}dd)`;
  };

  return (
    <Fade in timeout={800}>
      <Box sx={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
        backdropFilter: 'blur(30px)',
        borderRadius: '28px',
        p: 4,
        border: '1px solid rgba(255, 255, 255, 0.4)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
        mb: 4,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c)',
          borderRadius: '28px 28px 0 0'
        }
      }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mb: 4
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '12px',
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <AutoAwesomeIcon sx={{ color: 'white', fontSize: '1.5rem' }} />
            </Box>
            <Box>
              <Typography 
                variant="h5" 
                sx={{ 
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  fontWeight: 800,
                  fontSize: '1.4rem',
                  fontFamily: '"Poppins", sans-serif',
                  letterSpacing: '0.5px'
                }}
              >
                Filtrar por Tipo
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(0,0,0,0.6)',
                  fontSize: '0.9rem',
                  fontFamily: '"Poppins", sans-serif'
                }}
              >
                Selecione um ou mais tipos
              </Typography>
            </Box>
          </Box>
          
          {selectedTypes.length > 0 && (
            <IconButton 
              onClick={handleClearAll}
              sx={{
                background: 'linear-gradient(135deg, #f5576c, #f093fb)',
                color: 'white',
                width: 48,
                height: 48,
                borderRadius: '16px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                  boxShadow: '0 8px 25px rgba(245,87,108,0.4)'
                }
              }}
            >
              <ClearIcon />
            </IconButton>
          )}
        </Box>

        {/* Type Chips */}
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'center'
        }}>
          {pokemonTypes.map((type) => {
            const isSelected = selectedTypes.includes(type);
            const typeGradient = getTypeGradient(type);
            
            return (
              <Chip
                key={type}
                label={getTypeNameInPortuguese(type)}
                onClick={() => handleTypeClick(type)}
                sx={{
                  background: isSelected 
                    ? typeGradient
                    : 'rgba(255, 255, 255, 0.9)',
                  color: isSelected ? 'white' : 'rgba(0,0,0,0.8)',
                  border: `2px solid ${isSelected ? 'transparent' : getTypeColor(type)}`,
                  fontWeight: isSelected ? 700 : 600,
                  fontSize: '0.95rem',
                  fontFamily: '"Poppins", sans-serif',
                  px: 3,
                  py: 1.5,
                  height: '48px',
                  cursor: 'pointer',
                  borderRadius: '24px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isSelected 
                    ? `0 8px 25px ${getTypeColor(type)}40`
                    : '0 4px 15px rgba(0,0,0,0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    transition: 'left 0.6s'
                  },
                  '&:hover': {
                    background: typeGradient,
                    color: 'white',
                    transform: 'translateY(-4px) scale(1.05)',
                    boxShadow: `0 12px 35px ${getTypeColor(type)}50`,
                    border: '2px solid transparent',
                    '&::before': {
                      left: '100%'
                    }
                  }
                }}
              />
            );
          })}
        </Box>
        
        {selectedTypes.length > 0 && (
          <Box sx={{
            mt: 4,
            p: 3,
            background: 'linear-gradient(135deg, rgba(102,126,234,0.1), rgba(240,147,251,0.1))',
            borderRadius: '20px',
            border: '1px solid rgba(102,126,234,0.2)',
            textAlign: 'center'
          }}>
            <Typography 
              variant="body1" 
              sx={{ 
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                fontSize: '1rem',
                fontWeight: 600,
                fontFamily: '"Poppins", sans-serif'
              }}
            >
              ✨ {selectedTypes.length} tipo{selectedTypes.length > 1 ? 's' : ''} selecionado{selectedTypes.length > 1 ? 's' : ''}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(0,0,0,0.6)',
                fontSize: '0.85rem',
                mt: 0.5,
                fontFamily: '"Poppins", sans-serif'
              }}
            >
              Mostrando Pokémon do{selectedTypes.length > 1 ? 's' : ''} tipo{selectedTypes.length > 1 ? 's' : ''} {selectedTypes.map(type => getTypeNameInPortuguese(type)).join(' + ')}
            </Typography>
          </Box>
        )}
      </Box>
    </Fade>
  );
};

export default PokemonFilters;
