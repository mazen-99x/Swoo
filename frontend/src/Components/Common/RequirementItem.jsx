import React from "react";

const RequirementItem = ({ label, met }) => (
  <div
    className={`flex items-center gap-2 text-xs transition-colors duration-200 ${met ? "text-green-500" : "text-gray-400"}`}
  >
    <span
      className={`h-2 w-2 rounded-full transition-all duration-300 ${met ? "bg-green-500 scale-110" : "bg-gray-400 scale-100"}`}
    />
    <span>{label}</span>
  </div>
);

export default RequirementItem;
