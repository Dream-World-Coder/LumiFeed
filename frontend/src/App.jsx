import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { DarkModeProvider } from "./contexts/DarkModeContext";
import { AuthProvider } from "./contexts/AuthContext";

import Home from "./pages/Home/HomePage";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import ContactForm from "./pages/Contact/ContactForm";
import LandingPage from "./pages/LandingPage/LandingPage";
import Profile from "./pages/Profile/Profile";
import Article from "./pages/ArticleReader/Article";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
// import ForgotPassword from "./pages/Auth/ForgotPassword";
import DeleteAccount from "./pages/Auth/DeleteAccount";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import NotFound from "./pages/404";

import { Toaster } from "@/components/ui/sonner";

import "./App.css";

// I should not use open in new tab for reading articles specially in phones;
// Its more convenient though

const App = () => {
    // will add a loading state in the app later

    return (
        <AuthProvider>
            <DarkModeProvider>
                <Router>
                    <Routes>
                        <Route path="/landing-page" element={<LandingPage />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/contact-form" element={<ContactForm />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/article" element={<Article />} />
                        {/* Auth routes */}
                        <Route path="/auth/login" element={<Login />} />
                        <Route path="/auth/register" element={<Register />} />
                        {/* <Route path="/auth/forgot-password" element={<ForgotPassword />} /> */}
                        <Route
                            path="/auth/delete-account"
                            element={<DeleteAccount />}
                        />
                        <Route
                            path="/auth/verify-email"
                            element={<VerifyEmail />}
                        />

                        {/* handle 404 */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Router>
                <Toaster />
            </DarkModeProvider>
        </AuthProvider>
    );
};

export default App;
