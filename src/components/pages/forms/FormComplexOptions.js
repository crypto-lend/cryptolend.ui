import React from "react";

export default ({
  title,
  options,
  selected,
  updateServices,
  updateSelectedText
}) => {
  return (
    <div className="form-group">
      <label className="form-control-label font-weight-bold">{title}</label>
      <div className="row">
        {options.map(({ text, key, placeholder }, index) => (
          <div key={index} className="col-6 d-flex flex-column mb-3">
            <div
              className="custom-control custom-checkbox mb-1"
              onClick={e => updateServices(key)}
            >
              <input
                type="checkbox"
                checked={selected.hasOwnProperty(key)}
                className="custom-control-input"
              />
              <label
                className="custom-control-label"
                style={{ lineHeight: 1.9 }}
              >
                {text}
              </label>
            </div>
            <div>
              <input
                type="text"
                className="form-control w-75 form-control-sm"
                value={selected[key]}
                placeholder={placeholder}
                onChange={e => updateSelectedText(key, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
