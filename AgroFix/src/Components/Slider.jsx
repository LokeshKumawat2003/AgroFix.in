import React, { useEffect, useState } from "react";
import "../ConponentsStyle/slider.css";

const images = [
  "https://via.placeholder.com/800x300?text=Image+1",
  "https://via.placeholder.com/800x300?text=Image+2",
  "https://via.placeholder.com/800x300?text=Image+3",
  "https://via.placeholder.com/800x300?text=Image+4",
];

const ResponsiveImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="slider-container">
      <div
        className="slider"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Slide ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default ResponsiveImageSlider;
