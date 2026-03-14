import { useState } from "react";
import { changePassword } from "../../api/auth.api";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

export function ChangePasswordPage() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        password_confirmation: ""
    });
    const navigate = useNavigate();

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // 1. Basic Front-end Validations
        if (!form.email) return toast.error("Email is required");
        if (!(form.password == form.password_confirmation)) return toast.error("Password not match");
        if (form.password_confirmation.length < 8) return toast.error("Password must be at least 8 characters");

        try {
            await changePassword(form);
            toast.success("Password updated successfully");
            setForm(
                {
                    email: "",
                    password: "",
                    password_confirmation: ""
                }
            );
            navigate('/login');
        } catch (error: any) {
            console.error(error);
            const message = error.response?.data?.message || "Failed to update password";
            toast.error(message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="w-full max-w-sm text-center">
                <h1 className="text-3xl font-serif mb-8">RESET PASSWORD</h1>

                <input
                    name="email"
                    type="email"
                    value={form.email}
                    placeholder="User's Email"
                    className="w-full border-b py-2 mb-4 outline-none"
                    onChange={handleChange}
                />

                <input
                    name="password"
                    type="password"
                    value={form.password}
                    placeholder="New Password"
                    className="w-full border-b py-2 mb-4 outline-none"
                    onChange={handleChange}
                />

                <input
                    name="password_confirmation"
                    type="password"
                    value={form.password_confirmation}
                    placeholder="Confirm New Password"
                    className="w-full border-b py-2 mb-6 outline-none"
                    onChange={handleChange}
                />

                <Button variant="orange" rounded="full" className="w-full">
                    Update Password
                </Button>

                <p className="text-sm mt-4">
                    <button type="button" onClick={() => navigate(-1)} className="underline">
                        Go Back
                    </button>
                </p>
            </form>
        </div>
    );
}