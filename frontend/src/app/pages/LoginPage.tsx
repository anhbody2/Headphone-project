import { useState } from "react";
import { loginUser } from "../../api/auth.api";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useAuth } from "../../hook/authContext";
export function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const { login: updateContext } = useAuth();
    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e: any) => { 
    e.preventDefault();

    // Validations
    if (!form.email) {
        toast.error("Email is required");
        return;
    }
    if (!form.password) {
        toast.error("Password is required");
        return;
    }

    try {
    const res = await loginUser(form.email, form.password);
    const { token } = res.data;
    await updateContext(token); 
    toast.success("Login successful");
    navigate("/");
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Login failed");
  }
};

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleLogin} className="w-full max-w-sm text-center">
                <h1 className="text-3xl font-serif mb-8">LOGIN</h1>

                <input
                    name="email"
                    type="email"
                    value={form.email}
                    placeholder="Email"
                    className="w-full border-b py-2 mb-4 outline-none"
                    onChange={handleChange}
                />

                <input
                    name="password"
                    type="password"
                    value={form.password}
                    placeholder="Password"
                    className="w-full border-b py-2 mb-6 outline-none"
                    onChange={handleChange}
                />

                <Button variant="orange" rounded="full" className="w-full">
                    Login
                </Button>

                <p className="text-sm mt-4">
                    Don’t have an account? <a href="/register" className="underline">Register</a>
                </p>
                <p className="text-sm mt-4">
                    Forget password? <a href="/changePassword" className="underline">Forget Password</a>
                </p>
            </form>
        </div>
    );
}
