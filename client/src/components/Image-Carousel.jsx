"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const nextIndex =
        currentIndex >= images.length - 1 ? 0 : currentIndex + 1;

      setCurrentIndex(nextIndex);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentIndex, images.length]);

  return (
    <div className="w-full  mx-auto my-4">
      <Card className="overflow-hidden relative">
        <CardContent className="p-0">
          <div className="relative h-64">
            <img
              src={images[currentIndex]?.source}
              alt="Carousel"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
              <Button variant="ghost" size="icon" onClick={handlePrev}>
                <ChevronLeft className="w-6 h-6" />
              </Button>
            </div>
            <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
              <Button variant="ghost" size="icon" onClick={handleNext}>
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center mt-4 gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`h-2 w-2 rounded-full ${
              idx === currentIndex ? "bg-primary" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
