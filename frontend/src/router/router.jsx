import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/Auth/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
export let router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "login",
        element: <Login />
    },
    {
        path: "dashboard",
        element: <Dashboard />
    }
])