import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm py-3 px-6 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2E8B57] to-[#1e6b3f] flex items-center justify-center shadow">
            <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div>
            <h1 className="text-gray-900 text-lg leading-none">CanteenX</h1>
            <p className="text-xs text-gray-500">Employee Meal Planner</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-[#2E8B57]/10 px-3 py-1.5 rounded-lg">
          <svg className="w-3 h-3 text-[#2E8B57]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-xs text-[#2E8B57]">Week of Nov 7, 2025</span>
        </div>
      </div>
    </header>
  );
};

export default Header;