"use client";

import { ArrowLeft, RotateCcw } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const TableDisplay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = location.state;

  useEffect(() => {
    if (!params) {
      navigate("/");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const { tableNumber, fromValue, toValue } = params;
      const newResults = [];

      for (let i = fromValue; i <= toValue; i++) {
        newResults.push({
          multiplier: tableNumber,
          multiplicand: i,
          result: tableNumber * i,
        });
      }

      setResults(newResults);
      setIsLoading(false);
    }, 500);
  }, [params, navigate]);

  if (!params) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 rounded-2xl mb-6">
            <div className="w-6 h-6 border-2 border-slate-300 border-t-white rounded-full animate-spin" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            Generating table...
          </h2>
          <p className="text-slate-600">
            Creating multiplication table for {params.tableNumber}
          </p>
        </div>
      </div>
    );
  }

  const getColumnsCount = () => {
    if (results.length <= 12) return 1;
    if (results.length <= 24) return 2;
    if (results.length <= 36) return 3;
    return 4;
  };

  const columnsCount = getColumnsCount();
  const itemsPerColumn = Math.ceil(results.length / columnsCount);

  const columns = [];
  for (let i = 0; i < columnsCount; i++) {
    const start = i * itemsPerColumn;
    const end = start + itemsPerColumn;
    columns.push(results.slice(start, end));
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-lg hover:bg-white transition-all duration-200 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Generator
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-slate-800 transition-all duration-200 shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            New Table
          </Link>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 shadow-lg shadow-slate-900/5 overflow-hidden">
          <div className="bg-gray-800 text-white px-4 py-3 sm:px-6 sm:py-4 md:px-12 md:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex-1">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
                  Multiplication Table of {params.tableNumber}
                </h1>
                <p className="text-slate-300 text-sm sm:text-base mt-1">
                  {params.fromValue} to {params.toValue} ({results.length}{" "}
                  equations)
                </p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-lg">
                <span className="text-lg sm:text-xl font-bold">×</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div
              className={`grid gap-6 ${
                columnsCount === 1
                  ? "grid-cols-1"
                  : columnsCount === 2
                  ? "grid-cols-1 md:grid-cols-2"
                  : columnsCount === 3
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              }`}
            >
              {columns.map((column, columnIndex) => (
                <div key={columnIndex} className="space-y-3">
                  {column.map((result, index) => (
                    <div
                      key={columnIndex * itemsPerColumn + index}
                      className="group bg-slate-50 hover:bg-white border border-slate-200/50 rounded-lg p-4 transition-all duration-200 hover:shadow-md hover:shadow-slate-900/5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-md font-bold text-slate-900">
                            {result.multiplier}
                          </span>
                          <span className="text-slate-400 font-medium">×</span>
                          <span className="text-md font-bold text-slate-900">
                            {result.multiplicand}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 font-medium">=</span>
                          <span className="text-lg font-bold text-slate-900 bg-slate-900/5 px-3 py-1 rounded-lg group-hover:bg-slate-900/10 transition-colors duration-200">
                            {result.result}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-slate-500">
            Table generated successfully  
          </p>
        </div>
      </div>
    </div>
  );
};

export default TableDisplay;
