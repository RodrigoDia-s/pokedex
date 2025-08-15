import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./pages/Home";
import { ThemeProvider } from '@emotion/react';
import theme from './theme';
import { CssBaseline } from '@mui/material';
import PokemonDetail from './components/PokemonDetail';

const router = createBrowserRouter([{
  path: '/',
  element: <Home />
},
{
  path: '/pokemon/:pokemonaName',
  element: <PokemonDetail />
}])


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router}/>
    </ThemeProvider>
  
  )
}

export default App;
