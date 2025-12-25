import React from 'react';

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  let baseStyles = 'font-semibold rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2';
  let variantStyles = '';
  let sizeStyles = '';

  switch (variant) {
    case 'primary':
      variantStyles = 'bg-slate-800 text-white hover:bg-slate-700 active:bg-slate-900 focus:ring-slate-500';
      break;
    case 'secondary':
      variantStyles = 'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 focus:ring-indigo-500';
      break;
    case 'outline':
      variantStyles = 'border border-slate-800 text-slate-800 hover:bg-slate-100 active:bg-slate-200 focus:ring-slate-500';
      break;
    case 'text':
      variantStyles = 'text-slate-800 hover:text-indigo-600 active:text-indigo-700 focus:ring-slate-500';
      break;
  }

  switch (size) {
    case 'sm':
      sizeStyles = 'px-3 py-1.5 text-sm';
      break;
    case 'md':
      sizeStyles = 'px-4 py-2 text-base';
      break;
    case 'lg':
      sizeStyles = 'px-6 py-3 text-lg';
      break;
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};