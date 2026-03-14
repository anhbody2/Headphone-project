import PropTypes from 'prop-types';
import {type ReactNode } from 'react';

interface TrapezoidProps {
  width?: number | string;
  height?: number | string;
  topWidth?: number;
  bottomWidth?: number;
  color?: string;
  skew?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
  [key: string]: any;
}

const Trapezoid = ({ 
  width = 250, 
  height = 120, 
  topWidth = 80, 
  bottomWidth = 100,
  color = '#2ecc71',
  skew = 20,
  className = '',
  style = {},
  children,
  ...props 
}: TrapezoidProps) => {
  
  // Calculate clip-path polygon based on skew percentage
  const calculateClipPath = () => {
    const topSkew = (100 - topWidth) / 2;
    const bottomSkew = (100 - bottomWidth) / 2;
    
    return `polygon(${topSkew}% 0%, ${100 - topSkew}% 0%, ${100 - bottomSkew}% 100%, ${bottomSkew}% 100%)`;
  };

  const trapezoidStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    backgroundColor: color,
    clipPath: calculateClipPath(),
    ...style
  };

  return (
    <div 
      className={`trapezoid ${className}`.trim()}
      style={trapezoidStyle}
      {...props}
    >
      {children}
    </div>
  );
};

Trapezoid.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  topWidth: PropTypes.number, // Percentage of top width (0-100)
  bottomWidth: PropTypes.number, // Percentage of bottom width (0-100)
  color: PropTypes.string,
  skew: PropTypes.number, // Alternative: skew angle in degrees
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node
};

export default Trapezoid;