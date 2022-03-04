import React from "react";

const PageContainer: React.FC = ({ children }) => {
  return (
    <div className="py-4">
      <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
