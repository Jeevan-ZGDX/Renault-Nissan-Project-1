const mealData = {
  breakfast: {
    monday: [
      { id: 'b-m-1', name: 'Idly' },
      { id: 'b-m-2', name: 'Puri Bhaji' },
      { id: 'b-m-3', name: 'Sambar' },
      { id: 'b-m-4', name: 'Coconut Chutney' },
      { id: 'b-m-5', name: 'Meedhavade' },
      { id: 'b-m-6', name: 'Poori' },
      { id: 'b-m-7', name: 'Coffee' },
      { id: 'b-m-8', name: 'Oat' },
    ],
    tuesday: [
      { id: 'b-t-1', name: 'Carrot Dosa' },
      { id: 'b-t-2', name: 'Rava Dosa' },
      { id: 'b-t-3', name: 'Meduvury' },
      { id: 'b-t-4', name: 'Tomato Chutney' },
      { id: 'b-t-5', name: 'Coffee' },
    ],
    wednesday: [
      { id: 'b-w-1', name: 'Idly' },
      { id: 'b-w-2', name: 'Vada' },
      { id: 'b-w-3', name: 'Butter' },
      { id: 'b-w-4', name: 'Jam' },
      { id: 'b-w-5', name: 'Sambar' },
      { id: 'b-w-6', name: 'Masala Vada' },
      { id: 'b-w-7', name: 'Poori' },
      { id: 'b-w-8', name: 'Oat' },
    ],
    thursday: [
      { id: 'b-th-1', name: 'Carrot Dosa' },
      { id: 'b-th-2', name: 'Rava Dosa' },
      { id: 'b-th-3', name: 'Potato Chutney' },
      { id: 'b-th-4', name: 'Moongdhal Sundal' },
      { id: 'b-th-5', name: 'Sprouts' },
      { id: 'b-th-6', name: 'Coffee' },
    ],
    friday: [
      { id: 'b-f-1', name: 'Idly' },
      { id: 'b-f-2', name: 'Pongal/upma' },
      { id: 'b-f-3', name: 'Rasam/Sambar Milk' },
      { id: 'b-f-4', name: 'Sambar' },
      { id: 'b-f-5', name: 'Poori/sundal' },
      { id: 'b-f-6', name: 'Poori' },
    ],
    saturday: [
      { id: 'b-s-1', name: 'Veg idly' },
      { id: 'b-s-2', name: 'Dosa' },
      { id: 'b-s-3', name: 'Whitechanna Masala' },
      { id: 'b-s-4', name: 'Peanut Chutney' },
      { id: 'b-s-5', name: 'Poori' },
    ],
    sunday: [
      { id: 'b-su-1', name: 'Idly' },
      { id: 'b-su-2', name: 'Mango pangal' },
      { id: 'b-su-3', name: 'Sambar' },
      { id: 'b-su-4', name: 'Coconut Chutney' },
      { id: 'b-su-5', name: 'Meduvade' },
      { id: 'b-su-6', name: 'Poori' },
    ],
  },
  lunch: {
    monday: [
      { id: 'l-m-1', name: 'White Rice' },
      { id: 'l-m-2', name: 'Sambar' },
      { id: 'l-m-3', name: 'Rasam' },
      { id: 'l-m-4', name: 'Curd' },
      { id: 'l-m-5', name: 'Chapati' },
      { id: 'l-m-6', name: 'Vegetable Curry' },
    ],
    tuesday: [
      { id: 'l-t-1', name: 'White Rice' },
      { id: 'l-t-2', name: 'Dal' },
      { id: 'l-t-3', name: 'Vegetable Curry' },
      { id: 'l-t-4', name: 'Chapati' },
      { id: 'l-t-5', name: 'Pickle' },
    ],
    wednesday: [
      { id: 'l-w-1', name: 'Biryani' },
      { id: 'l-w-2', name: 'Raita' },
      { id: 'l-w-3', name: 'Pickle' },
      { id: 'l-w-4', name: 'Papad' },
    ],
    thursday: [
      { id: 'l-th-1', name: 'White Rice' },
      { id: 'l-th-2', name: 'Sambar' },
      { id: 'l-th-3', name: 'Rasam' },
      { id: 'l-th-4', name: 'Chapati' },
      { id: 'l-th-5', name: 'Dal' },
    ],
    friday: [
      { id: 'l-f-1', name: 'Pulao' },
      { id: 'l-f-2', name: 'Paneer Curry' },
      { id: 'l-f-3', name: 'Curd' },
      { id: 'l-f-4', name: 'Chapati' },
    ],
    saturday: [
      { id: 'l-s-1', name: 'White Rice' },
      { id: 'l-s-2', name: 'Dal' },
      { id: 'l-s-3', name: 'Mix Veg' },
      { id: 'l-s-4', name: 'Roti' },
    ],
    sunday: [
      { id: 'l-su-1', name: 'Special Thali' },
      { id: 'l-su-2', name: 'Sweet' },
      { id: 'l-su-3', name: 'Rice' },
    ],
  },
  dinner: {
    monday: [
      { id: 'd-m-1', name: 'Roti' },
      { id: 'd-m-2', name: 'Dal Fry' },
      { id: 'd-m-3', name: 'Rice' },
      { id: 'd-m-4', name: 'Sabzi' },
    ],
    tuesday: [
      { id: 'd-t-1', name: 'Chapati' },
      { id: 'd-t-2', name: 'Sabzi' },
      { id: 'd-t-3', name: 'Rice' },
      { id: 'd-t-4', name: 'Dal' },
    ],
    wednesday: [
      { id: 'd-w-1', name: 'Paratha' },
      { id: 'd-w-2', name: 'Curry' },
      { id: 'd-w-3', name: 'Curd' },
    ],
    thursday: [
      { id: 'd-th-1', name: 'Roti' },
      { id: 'd-th-2', name: 'Dal' },
      { id: 'd-th-3', name: 'Mix Veg' },
    ],
    friday: [
      { id: 'd-f-1', name: 'Chapati' },
      { id: 'd-f-2', name: 'Paneer' },
      { id: 'd-f-3', name: 'Rice' },
    ],
    saturday: [
      { id: 'd-s-1', name: 'Noodles' },
      { id: 'd-s-2', name: 'Manchurian' },
      { id: 'd-s-3', name: 'Fried Rice' },
    ],
    sunday: [
      { id: 'd-su-1', name: 'Puri' },
      { id: 'd-su-2', name: 'Bhaji' },
      { id: 'd-su-3', name: 'Sweet' },
    ],
  },
  supper: {
    monday: [
      { id: 's-m-1', name: 'Milk' },
      { id: 's-m-2', name: 'Cookies' },
    ],
    tuesday: [
      { id: 's-t-1', name: 'Juice' },
      { id: 's-t-2', name: 'Fruits' },
    ],
    wednesday: [
      { id: 's-w-1', name: 'Milk' },
      { id: 's-w-2', name: 'Biscuits' },
    ],
    thursday: [
      { id: 's-th-1', name: 'Coffee' },
      { id: 's-th-2', name: 'Snacks' },
    ],
    friday: [
      { id: 's-f-1', name: 'Tea' },
      { id: 's-f-2', name: 'Pakora' },
    ],
    saturday: [
      { id: 's-s-1', name: 'Milk' },
      { id: 's-s-2', name: 'Cake' },
    ],
    sunday: [
      { id: 's-su-1', name: 'Special Beverage' },
    ],
  },
};

export default mealData;