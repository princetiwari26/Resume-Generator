import React from 'react';
import { FaPlus, FaSave, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';

const Button = ({
  label,
  onClick,
  type = 'button',
  variant = 'default',
  bgClass = '',
  textColor = '',
  className = '',
  floatRight = false,
}) => {
  const getIcon = () => {
    switch (variant) {
      case 'add': return FaPlus;
      case 'save': return FaSave;
      case 'edit': return FaEdit;
      case 'cancel': return FaTimes;
      case 'delete': return FaTrash;
      default: return null;
    }
  };

  const getBackground = () => {
    if (bgClass) return bgClass;
    switch (variant) {
      case 'add':
        return 'bg-gradient-to-r from-purple-600 to-purple-800';
      case 'save':
        return 'bg-gradient-to-r from-green-600 to-green-800';
      case 'delete':
        return '';
      case 'cancel':
        return 'bg-gradient-to-r from-slate-600 to-slate-800';
      case 'edit':
        return '';
      default:
        return 'bg-gradient-to-r from-gray-600 to-gray-800';
    }
  };

  const Icon = getIcon();
  const background = getBackground();

  const finalTextColor =
    textColor || (variant === 'edit' || variant === 'delete' ? 'text-red-600' : 'text-white');

  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center px-2 py-1 ${background} ${finalTextColor} rounded-md hover:opacity-90 transition-all duration-300 ${floatRight ? 'float-right' : ''} ${className}`}
    >
      {Icon && <Icon className={`mr-1 ${finalTextColor} text-md`} />}
      {label && <span>{label}</span>}
    </button>
  );
};

export default Button;