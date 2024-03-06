import React from 'react';

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div>
      <div className="progress-bar w-full min-w-[200px] overflow-hidden rounded-full">
        <div className="relative h-2 w-full rounded-full bg-gray-300">
          <div
            className={`absolute inset-0 inline-block h-2 rounded-full bg-theo-navy`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="text-right text-sm font-medium">{progress}% complete</div>
    </div>
  );
};

export default ProgressBar;
