import React from 'react';

interface TopButtonProps {
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TopButton = React.forwardRef<HTMLButtonElement, TopButtonProps>(
  ({ icon, label, isActive, onClick }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={`flex items-center srounded-full transition-colors ${
          isActive ? 'bg-gray-200' : 'bg-white'
        } shadow-md hover:bg-gray-100`}
      >
        <img src={icon} alt={`${label} icon`} className="w-6 h-6" />
        <span className="text-gray-800 font-medium">{label}</span>
      </button>
    );
  }
);

export default TopButton;