import React from 'react';
import { 
  Modal, 
  Box, 
  Typography, 
  Chip, 
  Grid, 
  LinearProgress, 
  Divider,
  Card,
  IconButton,
  useTheme 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import ShieldIcon from '@mui/icons-material/Shield';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SpeedIcon from '@mui/icons-material/Speed';
import { DetailPokemon, PokemonType, PokemonStat } from '../interface/pokemon.interface';

interface PokemonModalProps {
  pokemon: DetailPokemon | null;
  open: boolean;
  onClose: () => void;
}

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
  fairy: '#EE99AC',
};

// Icon components for stats
const HpIcon = () => <FavoriteIcon />;
const AttackIcon = () => <FlashOnIcon />;
const DefenseIcon = () => <ShieldIcon />;
const SpecialAttackIcon = () => <AutoAwesomeIcon />;
const SpecialDefenseIcon = () => <ShieldIcon />;
const SpeedIconComponent = () => <SpeedIcon />;

const PokemonModal: React.FC<PokemonModalProps> = ({ pokemon, open, onClose }) => {
  const theme = useTheme();
  
  if (!pokemon) return null;

  const primaryType = pokemon.types?.[0]?.type?.name || 'normal';
  const primaryColor = typeColors[primaryType] || '#00ffff';

  const getStatIcon = (statName: string) => {
    switch (statName) {
      case 'hp': return '❤️';
      case 'attack': return '⚔️';
      case 'defense': return '🛡️';
      case 'special-attack': return '✨';
      case 'special-defense': return '🔮';
      case 'speed': return '⚡';
      default: return '📊';
    }
  };

  const getStatNameInPortuguese = (statName: string) => {
    switch (statName) {
      case 'hp': return 'Vida';
      case 'attack': return 'Ataque';
      case 'defense': return 'Defesa';
      case 'special-attack': return 'Ataque Especial';
      case 'special-defense': return 'Defesa Especial';
      case 'speed': return 'Velocidade';
      default: return statName.replace('-', ' ');
    }
  };

  const getTypeNameInPortuguese = (typeName: string) => {
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
    return typeTranslations[typeName] || typeName;
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: { xs: '95%', sm: '600px', md: '700px' },
          maxHeight: '90vh',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.95) 100%)',
          backdropFilter: 'blur(30px)',
          borderRadius: '32px',
          boxShadow: '0 40px 80px rgba(0, 0, 0, 0.25)',
          border: '2px solid rgba(255, 255, 255, 0.4)',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '8px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '32px 32px 0 0'
          },
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 10,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            width: 48,
            height: 48,
            '&:hover': {
              background: 'rgba(255, 255, 255, 1)',
              transform: 'scale(1.1)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
            },
            transition: 'all 0.2s ease',
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box sx={{ overflowY: 'auto', maxHeight: '90vh', p: { xs: 3, sm: 4 } }}>
          {/* Pokemon Image and Basic Info */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                position: 'relative',
                display: 'inline-block',
                mb: 3,
              }}
            >
              <Box
                sx={{
                  width: { xs: 200, sm: 250 },
                  height: { xs: 200, sm: 250 },
                  background: `radial-gradient(circle, ${primaryColor}20 0%, rgba(255, 255, 255, 0.9) 70%)`,
                  boxShadow: `0 20px 40px ${primaryColor}20`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `3px solid ${primaryColor}40`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: `0 25px 50px ${primaryColor}30`
                  },
                }}
              >
                <img
                  src={pokemon.sprites?.other?.['official-artwork']?.front_default}
                  alt={pokemon.name}
                  style={{
                    width: '180px',
                    height: '180px',
                    objectFit: 'contain',
                    filter: `drop-shadow(0 12px 24px ${primaryColor}40)`,
                  }}
                />
              </Box>
            </Box>

            <Typography variant="h4" component="h2" sx={{ 
              fontWeight: 700, 
              mb: 2, 
              textTransform: 'capitalize',
              background: `linear-gradient(135deg, ${primaryColor}, #667eea)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {pokemon.name}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3 }}>
              {pokemon.types?.map((type: PokemonType) => (
                <Chip
                  key={type.type.name}
                  label={getTypeNameInPortuguese(type.type.name)}
                  sx={{
                    background: `linear-gradient(135deg, ${typeColors[type.type.name]} 0%, ${typeColors[type.type.name]}dd 100%)`,
                    color: 'white',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                    border: `2px solid ${typeColors[type.type.name]}33`,
                    fontSize: '1rem',
                    px: 3,
                    py: 1,
                    borderRadius: '25px',
                    boxShadow: `0 6px 20px ${typeColors[type.type.name]}44`,
                    '&:hover': {
                      transform: 'translateY(-3px) scale(1.05)',
                      boxShadow: `0 12px 30px ${typeColors[type.type.name]}55`
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
              ))}
            </Box>
          </Box>

          <Divider sx={{ mb: 3, opacity: 0.3 }} />

          {/* Pokemon Stats */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                mb: 3,
                textAlign: 'center',
                color: theme.palette.text.primary,
              }}
            >
              Estatísticas
            </Typography>
            
            <Grid container spacing={2}>
              {pokemon.stats?.map((stat: PokemonStat) => {
                const percentage = Math.min((stat.base_stat / 150) * 100, 100);
                return (
                  <Grid item xs={12} sm={6} key={stat.stat.name}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: '16px',
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(15px)',
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 15px 35px rgba(0,0,0,0.15)'
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Box sx={{ 
                          mr: 1, 
                          color: 'white',
                          background: `linear-gradient(135deg, ${primaryColor} 0%, #667eea 100%)`,
                          borderRadius: '50%',
                          width: 32,
                          height: 32,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1rem'
                        }}>
                          {getStatIcon(stat.stat.name)}
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            textTransform: 'capitalize',
                            fontWeight: 600,
                            flex: 1,
                          }}
                        >
                          {getStatNameInPortuguese(stat.stat.name)}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 700,
                            background: `linear-gradient(135deg, ${primaryColor} 0%, #667eea 100%)`,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                          }}
                        >
                          {stat.base_stat}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={percentage}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: 'rgba(0,0,0,0.08)',
                          '& .MuiLinearProgress-bar': {
                            background: `linear-gradient(90deg, ${primaryColor} 0%, #667eea 100%)`,
                            borderRadius: 4
                          },
                        }}
                      />
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>

          {/* Pokemon Details */}
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                mb: 3,
                textAlign: 'center',
                color: theme.palette.text.primary,
              }}
            >
              Detalhes
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Card sx={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  p: 2
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: primaryColor }}>
                    Informações Básicas
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="body2">
                      <strong>Altura:</strong> {(pokemon.height / 10).toFixed(1)} m
                    </Typography>
                    <Typography variant="body2">
                      <strong>Peso:</strong> {(pokemon.weight / 10).toFixed(1)} kg
                    </Typography>
                    <Typography variant="body2">
                      <strong>ID:</strong> #{pokemon.id}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card sx={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  p: 2
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: primaryColor }}>
                    Habilidades
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {pokemon.abilities?.map((ability: any, index: number) => (
                      <Typography key={index} variant="body2" sx={{ textTransform: 'capitalize' }}>
                        • {ability.ability.name.replace('-', ' ')}
                      </Typography>
                    ))}
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default PokemonModal;
