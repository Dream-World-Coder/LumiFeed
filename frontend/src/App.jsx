// import reactLogo from "./assets/react.svg";
// can i also access it using /assets/react.svg? ==> yea, /src/assets/react.svg
// so virtually react fills the public/ folder with all items, so now it can be accessed from any url

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { DarkModeProvider } from "./contexts/DarkModeContext";

import Home from "./pages/Home/Home";
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

import "./App.css";

// I should not use open in new tab for reading articles specially in phones;
// Its more convenient though

const App = () => {
    // will add a loading state in the app later

    return (
        <DarkModeProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
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
        </DarkModeProvider>
    );
};

export default App;
