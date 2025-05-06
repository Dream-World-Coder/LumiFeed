import { useState, useEffect, useRef } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"; // Make sure path is correct
import AppLogo from "../../components/Logo";
import BackButton from "./components";
import DecorativeElement from "./DecortiveElements";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const formRef = useRef(null);
    const decorRef = useRef(null);
    const navigate = useNavigate();
    const { login } = useAuth(); // Get login function from Auth Context

    const handleInputChange = (e) => {
        const { name, value, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "rememberMe" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || "Login failed");
            }

            // If remember me is checked, store in localStorage
            if (formData.rememberMe) {
                localStorage.setItem("rememberMe", formData.email);
            } else {
                localStorage.removeItem("rememberMe");
            }

            // Use the login function from Auth Context
            await login(data.access_token, data.user);

            // Redirect to dashboard or home page
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Load remembered email if exists
    useEffect(() => {
        const rememberedEmail = localStorage.getItem("rememberMe");
        if (rememberedEmail) {
            setFormData((prev) => ({
                ...prev,
                email: rememberedEmail,
                rememberMe: true,
            }));
        }
    }, []);

    return (
        <>
            <BackButton />
            <div className="min-h-screen bg-cream flex items-center justify-center p-4 font-sentient">
                <DecorativeElement decorRef={decorRef} />

                <div className="relative max-w-md w-full">
                    {/* Logo section remains the same */}
                    <div className="text-center mb-8">
                        <AppLogo
                            width={64}
                            height={64}
                            backgroundColor="#8B4513"
                            letterColor="#FFFFFF"
                            className={`mx-auto mb-4 form-element`}
                        />
                        <h1 className="text-4xl md:text-5xl font-zodiak text-[#8B4513] tracking-wider mb-2 form-element">
                            LumiFeed
                        </h1>
                        <p className="text-[#8B4513]/80 italic text-lg form-element">
                            Welcome back
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="bg-white/40 backdrop-blur-md rounded-lg p-8 shadow-xl border border-[#8B4513]/20"
                    >
                        {/* Email Field */}
                        <div className="mb-6 form-element">
                            <label className="block text-[#8B4513] font-zodiak mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B4513]/60" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/50 border border-[#8B4513]/20 rounded-md py-3 px-12
                                    focus:ring-2 focus:ring-[#8B4513]/20 focus:border-[#8B4513]/40
                                    transition-all duration-300 outline-none"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="mb-6 form-element">
                            <label className="block text-[#8B4513] font-zodiak mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B4513]/60" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/50 border border-[#8B4513]/20 rounded-md py-3 px-12
                                    focus:ring-2 focus:ring-[#8B4513]/20 focus:border-[#8B4513]/40
                                    transition-all duration-300 outline-none"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B4513]/60
                                    hover:text-[#8B4513] transition-colors duration-300"
                                >
                                    {showPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between mb-6 form-element">
                            <label className="flex items-center space-x-2 text-[#8B4513]/80">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleInputChange}
                                    className="rounded border-[#8B4513]/20"
                                />
                                <span>Remember me</span>
                            </label>
                            <a
                                href="#"
                                className="text-[#8B4513] hover:underline"
                            >
                                Forgot Password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#8B4513] text-[#F2E8CF] py-3 rounded-md font-zodiak
                            hover:bg-[#8B4513]/90 transition-all duration-300 form-element
                            disabled:opacity-70 disabled:cursor-not-allowed
                            relative overflow-hidden group"
                        >
                            <span
                                className={`inline-block transition-all duration-300 ${
                                    isLoading ? "opacity-0" : "opacity-100"
                                }`}
                            >
                                Sign In
                            </span>
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-6 h-6 border-2 border-[#F2E8CF] border-t-transparent rounded-full animate-spin" />
                                </div>
                            )}
                        </button>

                        {/* Sign Up Link */}
                        <p className="text-center mt-6 text-[#8B4513]/80 form-element">
                            Don&apos;t have an account?{" "}
                            <a
                                href="/auth/register"
                                className="text-[#8B4513] hover:underline font-semibold"
                            >
                                Sign up
                            </a>
                        </p>
                    </form>

                    {/* Decorative Bottom Element */}
                    <div className="mt-8 text-center opacity-60 form-element">
                        <div className="w-24 h-1 bg-[#8B4513]/20 mx-auto mb-4" />
                        <p className="text-[#8B4513]/60 text-sm italic">
                            &quot;Knowledge is the light of the mind&quot;
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
