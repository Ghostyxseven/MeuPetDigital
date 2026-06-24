import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  className = '',
  hoverable = false,
  onClick,
}: CardProps) {
  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      className={`rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-200 ${
        hoverable || onClick
          ? 'hover:border-slate-200 hover:shadow-md cursor-pointer'
          : ''
      } ${onClick ? 'text-left w-full' : ''} ${className}`}
      onClick={onClick}
      type={onClick ? 'button' : undefined}
    >
      {children}
    </Component>
  );
}
