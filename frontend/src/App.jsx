import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";

import { DarkModeProvider } from "./contexts/DarkModeContext";
import { AuthProvider } from "./contexts/AuthContext";

import LandingPage from "./pages/LandingPage/LandingPage";
import Home from "./pages/Home/HomePage";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import ContactForm from "./pages/Contact/ContactForm";
import Article from "./pages/ArticleReader/Article";

import RegisterPageDexie from "./pages/Auth/Dexie/Register";

import Profile from "./pages/Profile/Profile";
// import ExampleUsage from "./pages/Test";

import NotFound from "./pages/404";
import "./App.css";

// https://lumifeed.onrender.com/api/fetch/news?source=the-indian-express&category=trending&subcategory=top-news&rssLink=_https_indianexpress.com--section--trending--feed--&number=25

// ADD SAVING OPTIONS IN ARTICLE READER PAGE

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <AuthProvider>
      <DarkModeProvider>
        <Router>
          <Analytics />
          <Routes>
            <Route path="/landing-page" element={<LandingPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/contact-form" element={<ContactForm />} />
            <Route path="/article-reader" element={<Article />} />
            <Route path="/auth/register" element={<RegisterPageDexie />} />

            <Route path="/profile" element={<Profile />} />
            {/* <Route path="/dashboard" element={<ExampleUsage />} /> */}

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
