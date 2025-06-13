import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-spinner" role="status" aria-label="Loading">
      <div className="loading-spinner__circle"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;