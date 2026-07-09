import React from "react";

const ProgressBar = ({ value, max, onChange }) => (
    <input type="range" min="0" max={max || 0} value={value} onChange={onChange} />
);

export default ProgressBar;
