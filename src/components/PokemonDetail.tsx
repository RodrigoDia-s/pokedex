import { Button, Grid } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import usePokemon from '../hooks/usePokemon'
import PokemonAvatar from './PokemonAvatar'
import PokemonBasicInfo from './PokemonBasicInfo'
import PokemonStats from './PokemonStats'
import { AwesomeButtonProgress } from 'react-awesome-button'
import { useNavigate } from 'react-router-dom';
import { POKEMON_API_POKEMON_URL } from '../constants';

const PokemonDetail = () => {
  let {pokemonaName} = useParams()

  const {pokemon, isLoading, fetchPokemon} = usePokemon()
  const navigate = useNavigate();

  useEffect(() => {
    if (pokemonaName) {
      const pokemonUrl = `${POKEMON_API_POKEMON_URL}/${pokemonaName}`;
      fetchPokemon(pokemonUrl);
    }
  }, [pokemonaName, fetchPokemon]);

  return (
    <Container>
      <Grid container flexDirection="column" alignItems="center" justifyContent="center" spacing={2} mt={1}>
        <Grid item container alignItems="center" justifyContent="center" spacing={2}>
          {isLoading ? (
            <Box>Loading...</Box>
          ) : pokemon ? (
            <>
              <Grid item xs={12} sm={6}>
                <PokemonAvatar pokemon={pokemon}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <PokemonBasicInfo pokemon={pokemon}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <PokemonStats pokemon={pokemon}/>
              </Grid>
            </>
          ) : (
            <Box>Pokemon not found</Box>
          )}
        </Grid>
        <Grid item>
        <AwesomeButtonProgress style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '20px 0',
      }} type="secondary" onPress={async (element, next) => {
        navigate("/");
      }}>
            Retorne para lista de Pokémon
          </AwesomeButtonProgress>
        </Grid>
      </Grid>
    </Container>
  )
}

export default PokemonDetail