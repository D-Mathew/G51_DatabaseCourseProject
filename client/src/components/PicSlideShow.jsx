import React, { useState, useEffect } from 'react';
import '../static/styles/slideshow.css'
import double from '../static/images/double.jpg' // image from https://unsplash.com/photos/person-in-white-nike-sneakers-playing-tennis-k0aVMMZwqtU
import queen from '../static/images/queen.jpg' // image from https://unsplash.com/photos/green-tennis-balls-on-tennis-court-newhL3aprGk
import king from '../static/images/king.jpg' // image from https://unsplash.com/photos/man-in-orange-shirt-and-black-shorts-holding-black-and-white-tennis-racket-2FKTyJqfWX8

const images = [double, queen, king];

const ImageSlideShow = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
      const timer = setTimeout(() => {
        setCurrentSlide((prevSlide) =>
          prevSlide === images.length - 1 ? 0 : prevSlide + 1
        );
      }, 5000);
      return () => clearTimeout(timer);
    }, [currentSlide]);

    return (
        <div className="slideshow">
            {images.map((src, index) => (
            <div
                key={src}
                className="slide"
                style={{
                backgroundImage: `url(${src})`,
                transform: `translateX(-${currentSlide * 100}%)`,
                }}
            >
            </div>
            ))}
        </div>
    );
};

export default ImageSlideShow;
