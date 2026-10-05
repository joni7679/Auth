import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom"


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { userLogin, loading, error } = useContext(AuthContext);
    const navigate = useNavigate()
    // handlesubmit logic here
    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = await userLogin({ email, password });
        if (data) {
            alert("Login successfully");
            setEmail("")
            setPassword("");
            navigate("/dashboard")
        }
    }
    return (
        <main className="px-4 md:px-8 min-h-screen flex flex-col items-center justify-center">
            <div className="max-w-md w-full">



                <div
                    className="p-6 rounded-lg bg-white border border-slate-300 shadow-xs md:p-6">
                    {
                        error && <div className="px-4 py-3 rounded bg-red-100 text-red-600 border border-red-600">
                            {
                                error
                            }
                        </div>
                    }
                    <form onSubmit={handleSubmit} className="space-y-6 mt-10">
                        <div>
                            <label htmlFor="email"
                                className="mb-2 text-slate-900 font-medium text-sm inline-block">Email</label>
                            <input type="email" id="email" name="email" placeholder="enter your email id"
                                value={email} onChange={(e) => setEmail(e.target.value)}
                                className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600" />
                        </div>
                        <div>
                            <label htmlFor="password"
                                className="mb-2 text-slate-900 font-medium text-sm inline-block">Password</label>
                            <input type="password" id="password" name="password" placeholder="••••••••"
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600" />
                        </div>
                        <div className="flex items-start flex-wrap gap-2">
                            <label className="flex items-center group has-[input:checked]:text-slate-900">
                                <input id="tmc" name="tmc" type="checkbox" className="sr-only" />
                                {/* Custom box */}
                                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded outline-1 outline-slate-300 bg-white group-has-[input:checked]:bg-blue-600 group-has-[input:checked]:outline-blue-600 group-focus-within:outline-2 group-focus-within:outline-blue-600" aria-hidden="true">
                                    {/* Checkmark */}
                                    <svg className="size-3 text-white opacity-0 group-has-[input:checked]:opacity-100" viewBox="0 0 12 10"
                                        fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M1 5l3 3 7-7" />
                                    </svg>
                                </span>
                                <span className="ml-3 text-sm text-slate-700">
                                    I accept the
                                </span>
                            </label>

                            <a href="#"
                                className="ml-1 text-sm font-medium text-blue-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                                Terms and Conditions
                            </a>
                        </div>
                        <button type="submit"
                            disabled={loading}
                            className={`w-full py-2 px-3.5 text-sm rounded-md font-semibold  tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 `}>
                            {loading ? " Login..." : " Login"}
                        </button>
                    </form>
                    <div className="mt-6 text-slate-900 text-sm text-center">Dont't have an account? <Link to={"/"}
                        className="text-blue-700 hover:underline ml-1 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                        Register here</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}