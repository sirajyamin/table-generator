"use client";

import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TableParams } from "../types";

const TableForm: React.FC = () => {
  const navigate = useNavigate();
  const [tableNumber, setTableNumber] = useState<string>("");
  const [fromValue, setFromValue] = useState<string>("");
  const [toValue, setToValue] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};
    const table = Number.parseInt(tableNumber);
    const from = Number.parseInt(fromValue);
    const to = Number.parseInt(toValue);

    if (!tableNumber || isNaN(table)) {
      newErrors.tableNumber =
        "Table Number is required and must be a valid number";
    } else if (table < 1 || table > 100) {
      newErrors.tableNumber = "Table Number must be between 1 and 100";
    }

    if (!fromValue || isNaN(from)) {
      newErrors.fromValue =
        "Start Value is required and must be a valid number";
    } else if (from < 1 || from > 1000) {
      newErrors.fromValue = "Start Value must be between 1 and 1000";
    }

    if (!toValue || isNaN(to)) {
      newErrors.toValue = "End Value is required and must be a valid number";
    } else if (to < 1 || to > 1000) {
      newErrors.toValue = "End Value must be between 1 and 1000";
    }

    if (!newErrors.fromValue && !newErrors.toValue && from > to) {
      newErrors.toValue =
        "End Value must be greater than or equal to Start Value";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;

    const params: TableParams = {
      tableNumber: Number.parseInt(tableNumber),
      fromValue: Number.parseInt(fromValue),
      toValue: Number.parseInt(toValue),
    };

    navigate("/table", { state: params });
  };

  return (
    <div className="h-full flex items-center justify-center pt-4">
      <div className="w-full max-w-md">
        <div className="text-center mt-20 mb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Multiplication Table
          </h1>
          <p className="text-slate-600">
            Generate clean, organized multiplication tables
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-slate-200/50 p-8 shadow-xl shadow-slate-900/5">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="tableNumber"
                className="block text-sm font-semibold text-slate-900"
              >
                Table Number
              </label>
              <input
                type="number"
                id="tableNumber"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                placeholder="Enter number (e.g., 7)"
                className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-lg focus:outline-none focus:bg-white transition-all duration-200 ${
                  errors.tableNumber
                    ? "border-red-300 focus:border-red-500"
                    : "border-slate-200 focus:border-slate-900"
                }`}
              />
              {errors.tableNumber && (
                <p className="text-sm text-red-600 font-medium">
                  {errors.tableNumber}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="fromValue"
                  className="block text-sm font-semibold text-slate-900"
                >
                  From
                </label>
                <input
                  type="number"
                  id="fromValue"
                  value={fromValue}
                  onChange={(e) => setFromValue(e.target.value)}
                  placeholder="1"
                  className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-md focus:outline-none focus:bg-white transition-all duration-200 ${
                    errors.fromValue
                      ? "border-red-300 focus:border-red-500"
                      : "border-slate-200 focus:border-slate-900"
                  }`}
                />
                {errors.fromValue && (
                  <p className="text-sm text-red-600 font-medium">
                    {errors.fromValue}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="toValue"
                  className="block text-sm font-semibold text-slate-900"
                >
                  To
                </label>
                <input
                  type="number"
                  id="toValue"
                  value={toValue}
                  onChange={(e) => setToValue(e.target.value)}
                  placeholder="12"
                  className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-md focus:outline-none focus:bg-white transition-all duration-200 ${
                    errors.toValue
                      ? "border-red-300 focus:border-red-500"
                      : "border-slate-200 focus:border-slate-900"
                  }`}
                />
                {errors.toValue && (
                  <p className="text-sm text-red-600 font-medium">
                    {errors.toValue}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white px-6 py-4 rounded-md hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-900/20 transition-all duration-200 flex items-center justify-center gap-3 font-semibold group"
            >
              Generate Table
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TableForm;
