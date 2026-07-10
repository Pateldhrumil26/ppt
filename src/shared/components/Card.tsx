import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm font-sans transition-all duration-200 ${className}`.trim()}
    >
      {children}
    </div>
  );
};

export default Card;
