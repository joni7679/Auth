import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {  useNavigate } from "react-router-dom"

export default function Dashboard() {
    const { userLogOut, } = useContext(AuthContext);
    let navigate = useNavigate()
    const handleLogout = async () => {
        await userLogOut();
        alert("user logout successfully");
        navigate("/")
    }

    return (
        <>
            <header className="px-4 py-3 bg-white shadow-xs  ">
                <div>
                    <p>Dashboard</p>
                </div>
                <div>
                    <button onClick={handleLogout} className="px-5 py-3 rounded-2xl   bg-red-600 text-white">Logout</button>
                </div>
            </header>
        </>
    )
}