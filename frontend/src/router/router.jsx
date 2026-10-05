import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/Auth/Login';
export let router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "login",
        element: <Login />
    }
])