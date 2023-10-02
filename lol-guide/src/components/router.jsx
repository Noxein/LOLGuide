import { createBrowserRouter,RouterProvider } from "react-router-dom";
import App from "../App";
import ItemShop from "./itemShop";
import ErrorpPage from "./errorpage";
import Guide from './Guide'

const Router = () =>{
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
            errorElement: <ErrorpPage />
        },
        {
            path: '/:name',
            element: <Guide />
        }
    ])

    return <RouterProvider router={router}/>
}
export default Router