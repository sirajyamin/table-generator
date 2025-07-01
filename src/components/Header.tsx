import React from 'react';
import { Calculator } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-3">
          <Calculator className="w-6 h-6 text-black" />
          <h1 className="text-xl font-semibold text-black">
            Multiplication Table
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Header;