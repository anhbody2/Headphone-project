import { useState } from "react";
import { registerUser } from "../../api/auth.api";
import { toast } from 'react-hot-toast';
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

// ================= Register Page =================
export function RegisterPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        user_name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e: any) => {
        e.preventDefault();
        if (form.password !== form.password_confirmation) {
            toast.error("Passwords do not match");
            return;
        }
        if (form.user_name == null || form.user_name == "") {
            toast.error("Name is required");
            return;
        }
        const payload = {
            user_name: form.user_name,
            email: form.email,
            password: form.password,
            password_confirmation: form.password_confirmation,
        };

        await registerUser(payload);
        toast.success("Registration successful");
        setForm({
            user_name: "",
            email: "",
            password: "",
            password_confirmation: "",
        });
        navigate("/");


    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleRegister} className="w-full max-w-sm text-center">
                <h1 className="text-3xl font-serif mb-8">REGISTER</h1>

                <input
                    name="user_name"
                    placeholder="Your name"
                    value={form.user_name}
                    className="w-full border-b py-2 mb-4 outline-none"
                    onChange={handleChange}
                />

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
                    className="w-full border-b py-2 mb-4 outline-none"
                    onChange={handleChange}
                />

                <input
                    name="password_confirmation"
                    type="password"
                    value={form.password_confirmation}
                    placeholder="Confirm password"
                    className="w-full border-b py-2 mb-6 outline-none"
                    onChange={handleChange}
                />

                <Button variant="orange" rounded="full" className="w-full">
                    Create Account
                </Button>

                <p className="text-sm mt-4">
                    Already have an account? <a href="/login" className="underline">Login</a>
                </p>
            </form>
        </div>
    );
}
