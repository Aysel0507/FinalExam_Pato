import AddPage from "../pages/AddPage";
import Basket from "../pages/Basket";
import Detail from "../pages/Detail";
import Favorites from "../pages/Favorites";
import Home from "../pages/Home";
import MainRoot from "../pages/MainRoot";

export const ROUTES=[
    {
        path: '/',
        element: <MainRoot />,
        children:[
            {
                index: true,
                element: <Home />
            },
            {
                path: 'add-page',
                element: <AddPage />
            },
            {
                path: 'favorites',
                element: <Favorites/>
            },
            {
                path: 'basket',
                element: <Basket/>
            },
            {
                path: '/products/:id',
                element: <Detail />
            }

        ]
    }
]