import React from 'react';

// Define the shape of our props
interface BentoGridProps {
  images: string[];
  className?: string; // Optional extra styling
}

const BentoGrid: React.FC<BentoGridProps> = ({ images, className = "" }) => {
  
  // Helper to determine CSS classes based on image index
  // We use Tailwind's responsive prefixes (md:) to handle the layout shift
  const getGridClass = (index: number): string => {
    switch (index) {
      case 0: 
        return "md:col-span-2 md:row-span-2 h-64 md:h-full"; // Large square
      case 1: 
        return "md:col-span-1 md:row-span-1 h-40 md:h-full"; // Top middle
      case 2: 
        return "md:col-span-1 md:row-span-1 h-40 md:h-full"; // Top right
      case 3: 
        return "md:col-span-2 md:row-span-1 h-32 md:h-full"; // Wide bottom left
      case 4: 
        return "md:col-span-1 md:row-span-1 h-64 md:h-full"; // Tall middle
      case 5: 
        return "md:col-span-3 md:row-span-1 h-32 md:h-full"; // Bottom right
      default: 
        return "col-span-1 row-span-1";
    }
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 p-4 w-full ${className}`}>
      {images.map((src, index) => (
        <div 
          key={`${src}-${index}`} 
          className={`${getGridClass(index)} bg-gray-100 rounded-3xl overflow-hidden group relative border border-gray-200`}
        >
          <img 
            src={src} 
            alt={`Gallery asset ${index + 1}`} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default BentoGrid;