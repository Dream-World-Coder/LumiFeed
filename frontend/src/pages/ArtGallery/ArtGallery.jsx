import React, { useState, useEffect } from "react";

const ArtGallery = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [images, setImages] = useState([]);

    // Predefined categories of images
    const categories = [
        "all",
        "nature",
        "portrait",
        "landscape",
        "abstract",
        "urban",
    ];

    // Generate placeholder images with categories
    useEffect(() => {
        const generateImages = () => {
            const imageData = [
                {
                    id: 1,
                    url: "https://picsum.photos/seed/1/800/600",
                    category: "nature",
                    title: "Misty Forest",
                    artist: "John Doe",
                },
                {
                    id: 2,
                    url: "https://picsum.photos/seed/2/800/600",
                    category: "portrait",
                    title: "Contemplation",
                    artist: "Jane Smith",
                },
                {
                    id: 3,
                    url: "https://picsum.photos/seed/3/800/600",
                    category: "landscape",
                    title: "Mountain Sunrise",
                    artist: "Alex Johnson",
                },
                {
                    id: 4,
                    url: "https://picsum.photos/seed/4/800/600",
                    category: "abstract",
                    title: "Geometric Waves",
                    artist: "Emily Brown",
                },
                {
                    id: 5,
                    url: "https://picsum.photos/seed/5/800/600",
                    category: "urban",
                    title: "City Lights",
                    artist: "Michael Wong",
                },
                {
                    id: 6,
                    url: "https://picsum.photos/seed/6/800/600",
                    category: "nature",
                    title: "Serene Lake",
                    artist: "Sarah Lee",
                },
            ];
            setImages(imageData);
        };

        generateImages();
    }, []);

    // Filter images based on selected category
    const filteredImages =
        selectedCategory === "all"
            ? images
            : images.filter((img) => img.category === selectedCategory);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
                    Art Gallery Showcase
                </h1>

                {/* Category Filter Buttons */}
                <div className="flex justify-center mb-8 space-x-4">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`
                px-4 py-2 rounded-lg transition-colors duration-300
                ${
                    selectedCategory === category
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-blue-100 border"
                }
                capitalize
              `}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Image Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredImages.map((image) => (
                        <div
                            key={image.id}
                            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                            data-category={image.category}
                        >
                            <div className="relative">
                                <img
                                    src={image.url}
                                    alt={image.title}
                                    className="w-full h-64 object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        {image.title}
                                    </h2>
                                    <span className="text-sm text-gray-500">
                                        {image.artist}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Images Found Message */}
                {filteredImages.length === 0 && (
                    <div className="text-center text-gray-500 mt-8">
                        No artworks found in this category.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArtGallery;
