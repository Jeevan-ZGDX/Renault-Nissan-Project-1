import React from 'react';
import { MealItem } from '../types';

interface DayColumnProps {
  day: string;
  meals: MealItem[];
  onSelectMeal: (mealId: string) => void;
  selectedMeals: string[];
}

const DayColumn: React.FC<DayColumnProps> = ({ day, meals, onSelectMeal, selectedMeals }) => {
  return (
    <div className="day-column">
      <h3 className="text-center text-lg font-semibold">{day}</h3>
      <div className="meal-list">
        {meals.map(meal => (
          <label key={meal.id} className={`meal-item ${selectedMeals.includes(meal.id) ? 'selected' : ''}`}>
            <input
              type="checkbox"
              checked={selectedMeals.includes(meal.id)}
              onChange={() => onSelectMeal(meal.id)}
            />
            {meal.name}
          </label>
        ))}
      </div>
    </div>
  );
};

export default DayColumn;