import React from 'react';
import { Loader2 } from 'lucide-react';

interface ProcessingStatusProps {
  currentFile: string;
  progress: number;
  status: string;
}

export const ProcessingStatus: React.FC<ProcessingStatusProps> = ({
  currentFile,
  progress,
  status
}) => {
  return (
    <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="text-xs font-medium text-blue-500">{progress}%</span>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {currentFile}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{status}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};