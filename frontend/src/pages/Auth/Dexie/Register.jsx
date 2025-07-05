// src/pages/Auth/Dexie/register.js

import { useState, useRef } from "react";
import { User, UserCheck, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import AppLogo from "../../../components/Logo";
import BackButton from "../components";
import DecorativeElement from "../DecortiveElements";
import { useEffect } from "react";

const RegisterPageDexie = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    profilePicture: "https://picsum.photos/id/18/200/200",
  });

  const { login, currentUser } = useAuth();
  const formRef = useRef(null);
  const decorRef = useRef(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const userDetailsFields = [
    {
      title: "Username",
      Icon: User,
      inputType: "text",
      inputName: "username",
      inputValue: formData.username,
      onchange: handleInputChange,
      placeholder: "A short name for calling you",
    },
    {
      title: "Full Name",
      Icon: UserCheck,
      inputType: "text",
      inputName: "fullName",
      inputValue: formData.fullName,
      onchange: handleInputChange,
      placeholder: "Your full name",
    },
    {
      title: "Profile Picture URL",
      Icon: Camera,
      inputType: "url",
      inputName: "profilePicture",
      inputValue: formData.profilePicture,
      onchange: handleInputChange,
      placeholder: "https://example.com/your-photo.jpg",
    },
  ];

  const validateForm = () => {
    if (!formData.username || formData.username.length < 3) {
      setError("Username must be at least 3 characters long");
      return false;
    }

    // Username validation - only letters, numbers, and underscores
    if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      setError("Username can only contain letters, numbers, and underscores");
      return false;
    }

    if (!formData.fullName || formData.fullName.length < 3) {
      setError("Full Name must be at least 3 characters long");
      return false;
    }

    if (formData.profilePicture && !isValidUrl(formData.profilePicture)) {
      setError("Please enter a valid profile picture URL");
      return false;
    }

    return true;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const result = await login({
        username: formData.username.trim(),
        fullName: formData.fullName.trim(),
        profilePicture: formData.profilePicture.trim() || null,
      });

      if (result.success) {
        navigate("/");
      } else {
        setError(result.error || "Registration failed");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) navigate("/");
  }, [currentUser, navigate]);

  return (
    <>
      <BackButton />
      <div className="min-h-screen bg-cream flex items-center justify-center p-4 font-sentient">
        <DecorativeElement decorRef={decorRef} />
        <div className="relative max-w-md w-full">
          <div className="text-center mb-8">
            <h1
              onClick={() => navigate("/")}
              className="text-4xl md:text-5xl font-dahlia text-[#8B4513] tracking-wider mb-2 form-element flex justify-center items-center gap-1 cursor-pointer"
            >
              <AppLogo
                width={36}
                height={36}
                backgroundColor="#8B4513"
                letterColor="#FFFFFF"
                className="form-element"
              />
              LumiFeed
            </h1>
            <p className="text-[#8B4513]/70 text-sm">
              Create your personal article collection
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white/40 backdrop-blur-md rounded-lg p-8 shadow-sm text-black border border-[#8B4513]/20"
          >
            {userDetailsFields.map((field) => (
              <div key={field.inputName} className="mb-6 form-element">
                <label className="block text-[#8B4513] font-zodiak mb-2 text-sm font-medium">
                  {field.title}
                </label>
                <div className="relative">
                  <field.Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B4513]/60" />
                  <input
                    type={field.inputType}
                    name={field.inputName}
                    value={field.inputValue}
                    onChange={field.onchange}
                    className="w-full bg-white/50 border border-[#8B4513]/20 rounded-md py-3 px-12 focus:ring-2 focus:ring-[#8B4513]/20 focus:border-[#8B4513]/40 transition-all duration-300 outline-none placeholder-[#8B4513]/40"
                    placeholder={field.placeholder}
                    required={field.inputName !== "profilePicture"}
                  />
                </div>
              </div>
            ))}

            {/* Profile Picture Preview */}
            {formData.profilePicture && isValidUrl(formData.profilePicture) && (
              <div className="mb-6 form-element">
                <label className="block text-[#8B4513] font-zodiak mb-2 text-sm font-medium">
                  Preview
                </label>
                <div className="flex justify-center">
                  <img
                    src={formData.profilePicture}
                    alt="Profile preview"
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#8B4513]/20"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#8B4513] text-[#F2E8CF] py-3 rounded-md font-zodiak hover:bg-[#8B4513]/90 transition-all duration-300 form-element disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <span
                className={`inline-block transition-all duration-300 ${
                  isLoading ? "opacity-0" : "opacity-100"
                }`}
              >
                Create Account
              </span>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-[#F2E8CF] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </button>
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

export default RegisterPageDexie;
