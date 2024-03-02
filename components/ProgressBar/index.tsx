import React from "react";

const ProgressBar = ({ progress }) => {
  const containerStyles = {
    height: 14,
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 4,
    margin: 1,
    boxShadow: "5px 10px 5px #D9D9D9"
  };

  const fillerStyles = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: "#34445A",
    borderRadius: "inherit",
  };

  const labelStyles = {
    padding: 1,
    color: "#34445A",
    textAlign: "right",
    fontSize: 20,
  };

  return (
    <div>
    <div className="progress-bar" style={containerStyles}>
      <div style={fillerStyles}>
      </div>
    </div>
        <div style={labelStyles}>{progress}% complete</div>
    </div>
  );
};

export default ProgressBar;
