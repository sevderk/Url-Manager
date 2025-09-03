import React from "react";

const Input = React.forwardRef(function Input(
  { label, error = "", className = "", inputClassName = "", ...props },
  ref
) {
  return (
    <label className={`block ${className}`}>
      {label && <div className="label">{label}</div>}
      <input ref={ref} {...props} className={`input ${inputClassName}`} />
      {error ? <div style={{marginTop:4, color:'#d92020', fontSize:13}}>{error}</div> : null}
    </label>
  );
});

export default Input;
