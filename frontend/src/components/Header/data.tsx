<header className="border-b border-[#8B4513]/20 bg-white/40 backdrop-blur-md">
    <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <Feather className="w-8 h-8 text-[#8B4513]" />
                <h1 className="text-3xl font-[Cinzel] text-[#8B4513]">
                    LumiFeed
                </h1>
            </div>

            <nav className="flex items-center space-x-8">
                <a
                    href="#"
                    className="text-[#8B4513] hover:text-[#8B4513]/80 transition-colors flex items-center space-x-2"
                >
                    <Home size={20} />
                    <span className="font-[Cinzel]">Home</span>
                </a>
                <a
                    href="#"
                    className="text-[#8B4513] hover:text-[#8B4513]/80 transition-colors flex items-center space-x-2"
                >
                    <Info size={20} />
                    <span className="font-[Cinzel]">About</span>
                </a>
                <a
                    href="#"
                    className="text-[#8B4513] hover:text-[#8B4513]/80 transition-colors flex items-center space-x-2"
                >
                    <Phone size={20} />
                    <span className="font-[Cinzel]">Contact</span>
                </a>
                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="flex items-center space-x-2 text-[#8B4513] hover:text-[#8B4513]/80 transition-colors"
                    >
                        <User size={20} />
                        <span className="font-[Cinzel]">Profile</span>
                        <ChevronDown size={16} />
                    </button>

                    {showProfileMenu && (
                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-[#8B4513]/20 py-2 z-50">
                            <div className="px-4 py-3 border-b border-[#8B4513]/10">
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={userData.profilePic}
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div>
                                        <p className="font-[Cinzel] text-[#8B4513]">
                                            {userData.name}
                                        </p>
                                        <p className="text-sm text-[#8B4513]/60">
                                            {userData.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <button className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2">
                                <Trash2 size={16} />
                                <span>Delete Account</span>
                            </button>
                            <button className="w-full px-4 py-2 text-left text-[#8B4513] hover:bg-[#8B4513]/10 transition-colors flex items-center space-x-2">
                                <LogOut size={16} />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    </div>
</header>;
