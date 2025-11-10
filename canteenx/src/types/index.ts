export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'supper';
export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface MealItem {
  id: string;
  name: string;
}

export interface Selection {
  mealType: MealType;
  day: DayOfWeek;
  items: string[];
}