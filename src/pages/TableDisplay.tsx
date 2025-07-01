import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { TableParams, TableResult } from '../types';

const TableDisplay: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState<TableResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = location.state as TableParams;

  useEffect(() => {
    if (!params) {
      navigate('/');
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      const { tableNumber, fromValue, toValue } = params;
      const newResults: TableResult[] = [];
      
      for (let i = fromValue; i <= toValue; i++) {
        newResults.push({
          multiplier: tableNumber,
          multiplicand: i,
          result: tableNumber * i
        });
      }
      
      setResults(newResults);
      setIsLoading(false);
    }, 500);
  }, [params, navigate]);

  if (!params) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-gray-600">Generating table...</p>
        </div>
      </div>
    );
  }

  // Calculate columns for optimal display
  const getColumnsCount = () => {
    if (results.length <= 12) return 1;
    if (results.length <= 24) return 2;
    if (results.length <= 36) return 3;
    return 4;
  };

  const columnsCount = getColumnsCount();
  const itemsPerColumn = Math.ceil(results.length / columnsCount);

  // Split results into columns
  const columns = [];
  for (let i = 0; i < columnsCount; i++) {
    const start = i * itemsPerColumn;
    const end = start + itemsPerColumn;
    columns.push(results.slice(start, end));
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-black border border-gray-300 rounded-md hover:border-gray-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              New Table
            </Link>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-lg border border-gray-200">
            {/* Table Header */}
            <div className="bg-black text-white px-6 py-4">
              <h2 className="text-xl font-semibold">
                Multiplication Table of {params.tableNumber}
              </h2>
              <p className="text-gray-300 text-sm mt-1">
                {params.fromValue} to {params.toValue} ({results.length} equations)
              </p>
            </div>

            {/* Table Content */}
            <div className="p-6">
              <div className={`grid gap-6 ${
                columnsCount === 1 ? 'grid-cols-1' :
                columnsCount === 2 ? 'grid-cols-1 md:grid-cols-2' :
                columnsCount === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              }`}>
                {columns.map((column, columnIndex) => (
                  <div key={columnIndex} className="space-y-2">
                    {column.map((result, index) => (
                      <div
                        key={columnIndex * itemsPerColumn + index}
                        className="flex items-center justify-between py-2 px-3 border border-gray-100 rounded hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-gray-900 font-medium">
                          {result.multiplier} × {result.multiplicand}
                        </span>
                        <span className="text-gray-600">=</span>
                        <span className="font-semibold text-black">
                          {result.result}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableDisplay;