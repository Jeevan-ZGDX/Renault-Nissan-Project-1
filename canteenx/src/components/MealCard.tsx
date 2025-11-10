import React from 'react';
import { MealItem } from '../types';

interface MealCardProps {
  meal: MealItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const MealCard: React.FC<MealCardProps> = ({ meal, isSelected, onSelect }) => {
  const handleClick = () => {
    onSelect(meal.id);
  };

  return (
    <div
      onClick={handleClick}
      className={`p-4 border rounded-lg cursor-pointer transition-all ${isSelected ? 'bg-[#2E8B57]/5 border-[#2E8B57]' : 'border-gray-200 hover:border-[#2E8B57]/30'}`}
    >
      <p className={`text-sm ${isSelected ? 'text-[#2E8B57]' : 'text-gray-700'}`}>
        {meal.name}
      </p>
    </div>
  );
};

export default MealCard;