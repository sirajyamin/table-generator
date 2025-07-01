import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { TableParams } from '../types';

const TableForm: React.FC = () => {
  const navigate = useNavigate();
  const [tableNumber, setTableNumber] = useState<string>('');
  const [fromValue, setFromValue] = useState<string>('');
  const [toValue, setToValue] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    const table = parseInt(tableNumber);
    const from = parseInt(fromValue);
    const to = parseInt(toValue);

    if (!tableNumber || isNaN(table) || table < 1) {
      newErrors.tableNumber = 'Enter a valid number';
    }
    
    if (!fromValue || isNaN(from) || from < 1) {
      newErrors.fromValue = 'Enter a valid number';
    }
    
    if (!toValue || isNaN(to) || to < 1) {
      newErrors.toValue = 'Enter a valid number';
    }
    
    if (!newErrors.fromValue && !newErrors.toValue && from > to) {
      newErrors.toValue = 'Must be greater than start value';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateInputs()) return;

    const params: TableParams = {
      tableNumber: parseInt(tableNumber),
      fromValue: parseInt(fromValue),
      toValue: parseInt(toValue)
    };

    navigate('/table', { state: params });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-black mb-2">
            Create Multiplication Table
          </h2>
          <p className="text-gray-600">
            Enter the details below
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="tableNumber" className="block text-sm font-medium text-black mb-2">
                Table Number
              </label>
              <input
                type="number"
                id="tableNumber"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                placeholder="e.g., 6"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors ${
                  errors.tableNumber ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.tableNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.tableNumber}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="fromValue" className="block text-sm font-medium text-black mb-2">
                  From
                </label>
                <input
                  type="number"
                  id="fromValue"
                  value={fromValue}
                  onChange={(e) => setFromValue(e.target.value)}
                  placeholder="1"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors ${
                    errors.fromValue ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.fromValue && (
                  <p className="mt-1 text-sm text-red-600">{errors.fromValue}</p>
                )}
              </div>

              <div>
                <label htmlFor="toValue" className="block text-sm font-medium text-black mb-2">
                  To
                </label>
                <input
                  type="number"
                  id="toValue"
                  value={toValue}
                  onChange={(e) => setToValue(e.target.value)}
                  placeholder="20"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors ${
                    errors.toValue ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.toValue && (
                  <p className="mt-1 text-sm text-red-600">{errors.toValue}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white px-4 py-3 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black transition-colors flex items-center justify-center gap-2 font-medium"
            >
              Generate Table
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TableForm;