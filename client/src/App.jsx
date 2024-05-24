import './App.css'
import { ROUTES } from './routes/ROUTES'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import FavoritesProvider from './context/FavoritesContext';
import BasketProvider from './context/BasketContext';


const router = createBrowserRouter(ROUTES)

function App() {

  return (
    <>
      <BasketProvider>
        <FavoritesProvider>
          <RouterProvider router={router} />
        </FavoritesProvider>
      </BasketProvider>
    </>
  )
}

export default App
