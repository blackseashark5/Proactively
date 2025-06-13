import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export const PastData: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Past Term Sheets
        </h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="yyyy-MM-dd"
              className="pl-10 input-field"
              placeholderText="Filter by date"
              isClearable
            />
          </div>
        </div>
      </div>

      <div className="text-center py-12">
        <div className="text-gray-400 dark:text-gray-500">
          <Calendar className="w-12 h-12 mx-auto mb-4" />
          <p className="text-lg">No term sheets found</p>
        </div>
      </div>
    </div>
  );
};