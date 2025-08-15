import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Fade,
  CircularProgress,
  IconButton
} from '@mui/material';
import {
  FilterList as FilterIcon,
  CatchingPokemon as PokemonIcon,
  Close as CloseIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon
} from '@mui/icons-material';
import PokemonList from '../components/PokemonList';
import PokemonModal from '../components/PokemonModal';
import PokemonFilters from '../components/PokemonFilters';
import usePokemons from '../hooks/usePokemons';
import usePokemon from '../hooks/usePokemon';

const Home: React.FC = () => {
  const { pokemons, fetchNextPage, hasMorePokemon, selectedTypes, onTypeFilter, loading, pokemonTypes } = usePokemons();
  const { pokemon, fetchPokemon } = usePokemon();
  const [showFilters, setShowFilters] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);
  const [backgroundPokemons, setBackgroundPokemons] = useState<Array<{
    id: number, 
    x: number, 
    y: number, 
    delay: number, 
    pokemon: string,
    size: number,
    isWaving: boolean
  }>>([]);
  const [universeElements, setUniverseElements] = useState<Array<{
    id: number,
    x: number,
    y: number,
    delay: number,
    type: 'pokeball' | 'greatball' | 'ultraball' | 'masterball' | 'potion' | 'berry' | 'fossil',
    size: number,
    rotation: number
  }>>([]);

  const handlePokemonClick = async (pokemonName: string) => {
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    await fetchPokemon(pokemonUrl);
    setModalOpen(true);
  };

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);

    // Generate background Pokemon - increased quantity
    const pokemonNames = [
      'pikachu', 'charmander', 'squirtle', 'bulbasaur', 'eevee', 'psyduck', 'snorlax',
      'mew', 'mewtwo', 'charizard', 'blastoise', 'venusaur', 'gengar', 'alakazam',
      'machamp', 'golem', 'rapidash', 'slowpoke', 'magikarp', 'gyarados', 'lapras',
      'ditto', 'vaporeon', 'jolteon', 'flareon', 'porygon', 'aerodactyl', 'dragonite',
      'meowth', 'persian', 'golduck', 'primeape', 'growlithe', 'arcanine', 'poliwag',
      'abra', 'kadabra', 'machop', 'bellsprout', 'tentacool', 'geodude', 'ponyta',
      'slowbro', 'magnemite', 'farfetchd', 'doduo', 'seel', 'grimer', 'shellder',
      'gastly', 'haunter', 'onix', 'drowzee', 'krabby', 'voltorb', 'exeggcute',
      'cubone', 'hitmonlee', 'lickitung', 'koffing', 'rhyhorn', 'chansey', 'tangela',
      'kangaskhan', 'horsea', 'goldeen', 'staryu', 'scyther', 'jynx', 'electabuzz',
      'magmar', 'pinsir', 'tauros'
    ];
    
    const newBackgroundPokemons = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 85 + 5,
      y: Math.random() * 80 + 10,
      delay: Math.random() * 5,
      pokemon: pokemonNames[Math.floor(Math.random() * pokemonNames.length)],
      size: Math.random() * 45 + 55,
      isWaving: Math.random() > 0.6
    }));
    
    setBackgroundPokemons(newBackgroundPokemons);

    // Generate universe elements - increased quantity and variety
    const elementTypes: Array<'pokeball' | 'greatball' | 'ultraball' | 'masterball' | 'potion' | 'berry' | 'fossil'> = [
      'pokeball', 'greatball', 'ultraball', 'masterball', 'potion', 'berry', 'fossil'
    ];
    
    const newUniverseElements = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 85 + 5,
      delay: Math.random() * 8,
      type: elementTypes[Math.floor(Math.random() * elementTypes.length)],
      size: Math.random() * 30 + 18,
      rotation: Math.random() * 360
    }));
    
    setUniverseElements(newUniverseElements);
  }, []);

  const handleLoadMore = async () => {
    await fetchNextPage();
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: darkMode 
        ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
        : '#f8fafc',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: darkMode
          ? 'radial-gradient(ellipse at 30% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)'
          : 'radial-gradient(ellipse at 30% 70%, rgba(102, 126, 234, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(148, 163, 184, 0.06) 0%, transparent 50%)',
        pointerEvents: 'none',
        zIndex: 0
      },
      overflow: 'hidden',
      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      {/* Main Content Container */}
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 10, py: { xs: 2, md: 4 } }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'center', sm: 'center' }, 
          justifyContent: { xs: 'center', sm: 'space-between' },
          mb: 4,
          px: 2,
          gap: { xs: 2, sm: 0 }
        }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center', 
            gap: 2,
            textAlign: { xs: 'center', sm: 'left' }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <PokemonIcon sx={{ 
                fontSize: '2.5rem', 
                color: darkMode ? '#3b82f6' : '#667eea',
                filter: darkMode 
                  ? 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))' 
                  : 'drop-shadow(0 4px 8px rgba(102, 126, 234, 0.3))'
              }} />
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 800,
                  background: darkMode
                    ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
                    : 'linear-gradient(135deg, #667eea, #764ba2)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  fontFamily: '"Poppins", sans-serif',
                  letterSpacing: '1px',
                  textShadow: darkMode 
                    ? '0 0 20px rgba(59, 130, 246, 0.3)' 
                    : 'none'
                }}
              >
                Pokédex
              </Typography>
            </Box>
            <IconButton
              onClick={() => setShowFilters(!showFilters)}
              sx={{
                background: darkMode
                  ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))'
                  : 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                backdropFilter: 'blur(10px)',
                border: darkMode 
                  ? '1px solid rgba(59, 130, 246, 0.3)' 
                  : '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                width: 48,
                height: 48,
                color: darkMode ? '#3b82f6' : '#667eea',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                  background: darkMode
                    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3))'
                    : 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
                  boxShadow: darkMode 
                    ? '0 8px 25px rgba(59, 130, 246, 0.4)' 
                    : '0 8px 25px rgba(102, 126, 234, 0.3)'
                }
              }}
            >
              <FilterIcon />
            </IconButton>
          </Box>
          
          {/* Dark mode button - only on desktop */}
          <IconButton
            onClick={() => setDarkMode(!darkMode)}
            sx={{
              display: { xs: 'none', sm: 'flex' },
              background: darkMode
                ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))'
                : 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
              backdropFilter: 'blur(10px)',
              border: darkMode 
                ? '1px solid rgba(59, 130, 246, 0.3)' 
                : '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '12px',
              width: 48,
              height: 48,
              color: darkMode ? '#fbbf24' : '#667eea',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1)',
                background: darkMode
                  ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(139, 92, 246, 0.2))'
                  : 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
                boxShadow: darkMode 
                  ? '0 8px 25px rgba(251, 191, 36, 0.4)' 
                  : '0 8px 25px rgba(102, 126, 234, 0.3)'
              }
            }}
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>

        {/* Filters Section */}
        {showFilters && (
          <Fade in={showFilters}>
            <Box sx={{ py: { xs: 2, md: 3 }, mb: { xs: 2, md: 3 } }}>
              <PokemonFilters 
                onTypeFilter={onTypeFilter} 
                selectedTypes={selectedTypes}
                pokemonTypes={pokemonTypes}
              />
            </Box>
          </Fade>
        )}

        {/* Pokemon List */}
        <PokemonList 
          pokemons={pokemons} 
          onPokemonClick={handlePokemonClick}
        />

        {/* Load More Button */}
        {hasMorePokemon && (
          <Fade in timeout={1600}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 4, md: 6 } }}>
              <Button
                onClick={fetchNextPage}
                disabled={loading}
                sx={{
                  background: darkMode 
                    ? 'rgba(30, 41, 59, 0.9)' 
                    : 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: darkMode 
                    ? '1px solid rgba(148, 163, 184, 0.2)' 
                    : '1px solid rgba(0, 0, 0, 0.1)',
                  color: darkMode ? '#e2e8f0' : '#4a5568',
                  fontWeight: 600,
                  fontSize: { xs: '0.95rem', md: '1rem' },
                  fontFamily: '"Poppins", sans-serif',
                  px: { xs: 4, md: 6 },
                  py: { xs: 1.5, md: 2 },
                  borderRadius: '12px',
                  textTransform: 'none',
                  boxShadow: darkMode 
                    ? '0 4px 12px rgba(0,0,0,0.3)' 
                    : '0 4px 12px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: darkMode 
                      ? 'rgba(51, 65, 85, 1)' 
                      : 'rgba(255, 255, 255, 1)',
                    transform: 'translateY(-2px)',
                    boxShadow: darkMode 
                      ? '0 8px 25px rgba(59, 130, 246, 0.25)' 
                      : '0 8px 25px rgba(0,0,0,0.15)',
                    color: darkMode ? '#60a5fa' : '#667eea'
                  },
                  '&:disabled': {
                    opacity: 0.6,
                    cursor: 'not-allowed'
                  }
                }}
              >
                {loading ? (
                  <>
                    <CircularProgress size={16} sx={{ mr: 1, color: darkMode ? '#e2e8f0' : '#4a5568' }} />
                    Carregando...
                  </>
                ) : (
                  'Carregar Mais Pokémon'
                )}
              </Button>
            </Box>
          </Fade>
        )}
      </Container>

      {/* Mobile Dark Mode Button - Fixed Bottom Right */}
      <IconButton
        onClick={() => setDarkMode(!darkMode)}
        sx={{
          display: { xs: 'flex', sm: 'none' },
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
          background: darkMode
            ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(139, 92, 246, 0.9))'
            : 'linear-gradient(135deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9))',
          backdropFilter: 'blur(20px)',
          border: darkMode 
            ? '2px solid rgba(59, 130, 246, 0.5)' 
            : '2px solid rgba(255, 255, 255, 0.5)',
          borderRadius: '50%',
          width: 56,
          height: 56,
          color: 'white',
          boxShadow: darkMode 
            ? '0 8px 32px rgba(59, 130, 246, 0.4)' 
            : '0 8px 32px rgba(102, 126, 234, 0.4)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: darkMode 
              ? '0 12px 40px rgba(59, 130, 246, 0.6)' 
              : '0 12px 40px rgba(102, 126, 234, 0.6)'
          }
        }}
      >
        {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>

      {/* Interactive Background Pokemon */}
      {backgroundPokemons.map((bgPokemon) => {
        // Pokemon ID mapping for more variety
        const getPokemonId = (name: string) => {
          const pokemonIds: { [key: string]: string } = {
            'pikachu': '25', 'charmander': '4', 'squirtle': '7', 'bulbasaur': '1',
            'eevee': '133', 'psyduck': '54', 'snorlax': '143', 'mew': '151',
            'mewtwo': '150', 'charizard': '6', 'blastoise': '9', 'venusaur': '3',
            'gengar': '94', 'alakazam': '65', 'machamp': '68', 'golem': '76',
            'rapidash': '78', 'slowpoke': '79', 'magikarp': '129', 'gyarados': '130',
            'lapras': '131', 'ditto': '132', 'vaporeon': '134', 'jolteon': '135',
            'flareon': '136', 'porygon': '137', 'omanyte': '138', 'kabuto': '140',
            'aerodactyl': '142', 'articuno': '144', 'zapdos': '145', 'moltres': '146',
            'dragonite': '149', 'meowth': '52', 'persian': '53', 'golduck': '55',
            'primeape': '57', 'growlithe': '58', 'arcanine': '59', 'poliwag': '60',
            'poliwrath': '62', 'abra': '63', 'kadabra': '64', 'machop': '66',
            'machoke': '67', 'bellsprout': '69', 'victreebel': '71', 'tentacool': '72',
            'tentacruel': '73', 'geodude': '74', 'graveler': '75', 'ponyta': '77',
            'slowbro': '80', 'magnemite': '81', 'magneton': '82', 'farfetchd': '83',
            'doduo': '84', 'dodrio': '85', 'seel': '86', 'dewgong': '87',
            'grimer': '88', 'muk': '89', 'shellder': '90', 'cloyster': '91',
            'gastly': '92', 'haunter': '93', 'onix': '95', 'drowzee': '96',
            'hypno': '97', 'krabby': '98', 'kingler': '99', 'voltorb': '100',
            'electrode': '101', 'exeggcute': '102', 'exeggutor': '103', 'cubone': '104',
            'marowak': '105', 'hitmonlee': '106', 'hitmonchan': '107', 'lickitung': '108',
            'koffing': '109', 'weezing': '110', 'rhyhorn': '111', 'rhydon': '112',
            'chansey': '113', 'tangela': '114', 'kangaskhan': '115', 'horsea': '116',
            'seadra': '117', 'goldeen': '118', 'seaking': '119', 'staryu': '120',
            'starmie': '121', 'scyther': '123', 'jynx': '124', 'electabuzz': '125',
            'magmar': '126', 'pinsir': '127', 'tauros': '128'
          };
          return pokemonIds[name] || '25';
        };

        return (
          <Box
            key={bgPokemon.id}
            sx={{
              position: 'absolute',
              left: `${bgPokemon.x}%`,
              top: `${bgPokemon.y}%`,
              width: `${bgPokemon.size}px`,
              height: `${bgPokemon.size}px`,
              zIndex: -1,
              opacity: darkMode ? 0.4 : 0.25,
              animation: `pokemonFloat 8s ease-in-out infinite ${bgPokemon.delay}s, ${bgPokemon.isWaving ? 'pokemonWave 3s ease-in-out infinite' : 'pokemonBounce 4s ease-in-out infinite'} ${bgPokemon.delay * 0.5}s`,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              pointerEvents: 'none',
              '&:hover': {
                opacity: darkMode ? 0.6 : 0.4,
                transform: 'scale(1.05)',
                zIndex: -1
              },
              '@keyframes pokemonFloat': {
                '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
                '25%': { transform: 'translateY(-10px) translateX(5px)' },
                '50%': { transform: 'translateY(-15px) translateX(-3px)' },
                '75%': { transform: 'translateY(-5px) translateX(-8px)' }
              },
              '@keyframes pokemonWave': {
                '0%, 50%, 100%': { transform: 'rotate(0deg)' },
                '25%': { transform: 'rotate(10deg)' },
                '75%': { transform: 'rotate(-10deg)' }
              },
              '@keyframes pokemonBounce': {
                '0%, 100%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.05)' }
              }
            }}
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getPokemonId(bgPokemon.pokemon)}.png`}
              alt={bgPokemon.pokemon}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: darkMode 
                  ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.2))' 
                  : 'drop-shadow(0 2px 6px rgba(0,0,0,0.08))'
              }}
            />
            {bgPokemon.isWaving && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  fontSize: '14px',
                  animation: 'wave 2s ease-in-out infinite',
                  '@keyframes wave': {
                    '0%, 100%': { transform: 'rotate(0deg)' },
                    '25%': { transform: 'rotate(20deg)' },
                    '75%': { transform: 'rotate(-20deg)' }
                  }
                }}
              >
                👋
              </Box>
            )}
          </Box>
        );
      })}

      {/* Pokemon Universe Elements */}
      {universeElements.map((element) => {
        const getElementEmoji = (type: string) => {
          const elements = {
            'pokeball': '⚪',
            'greatball': '🔵', 
            'ultraball': '⚫',
            'masterball': '🟣',
            'potion': '🧪',
            'berry': '🍓',
            'fossil': '🗿'
          };
          return elements[type as keyof typeof elements] || '⚪';
        };

        return (
          <Box
            key={`element-${element.id}`}
            sx={{
              position: 'absolute',
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: `${element.size}px`,
              height: `${element.size}px`,
              zIndex: -1,
              opacity: darkMode ? 0.3 : 0.2,
              animation: `universeFloat 10s ease-in-out infinite ${element.delay}s, universeRotate 15s linear infinite`,
              transition: 'all 0.3s ease',
              transform: `rotate(${element.rotation}deg)`,
              pointerEvents: 'none',
              '&:hover': {
                opacity: darkMode ? 0.5 : 0.35,
                transform: `scale(1.1) rotate(${element.rotation + 45}deg)`,
                zIndex: -1
              },
              '@keyframes universeFloat': {
                '0%, 100%': { transform: `translateY(0px) rotate(${element.rotation}deg)` },
                '50%': { transform: `translateY(-12px) rotate(${element.rotation + 180}deg)` }
              },
              '@keyframes universeRotate': {
                '0%': { transform: `rotate(${element.rotation}deg)` },
                '100%': { transform: `rotate(${element.rotation + 360}deg)` }
              }
            }}
          >
            <Box
              sx={{
                fontSize: `${element.size * 0.8}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                filter: darkMode 
                  ? 'drop-shadow(0 0 6px rgba(139, 92, 246, 0.3))' 
                  : 'drop-shadow(0 1px 3px rgba(0,0,0,0.08))',
                textShadow: darkMode 
                  ? '0 0 8px rgba(139, 92, 246, 0.4)' 
                  : 'none'
              }}
            >
              {getElementEmoji(element.type)}
            </Box>
          </Box>
        );
      })}

      {/* Subtle Floating Elements */}
      {particles.slice(0, 6).map((particle) => (
        <Box
          key={particle.id}
          sx={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: '3px',
            height: '3px',
            background: darkMode 
              ? 'rgba(59, 130, 246, 0.4)' 
              : 'rgba(148, 163, 184, 0.4)',
            borderRadius: '50%',
            animation: `subtleFloat 12s ease-in-out infinite ${particle.delay}s`,
            zIndex: 1,
            opacity: 0.3,
            '@keyframes subtleFloat': {
              '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
              '50%': { transform: 'translateY(-20px) translateX(10px)' }
            }
          }}
        />
      ))}



      {/* Pokemon Modal */}
      <PokemonModal
        pokemon={pokemon}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </Box>
    );
};

export default Home;