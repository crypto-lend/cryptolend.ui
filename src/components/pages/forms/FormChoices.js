import React from "react";

export default ({ options, title, moreThanOne, type, classes }) => (
  <div className="form-group">
    <label className="form-control-label font-weight-bold">
      {title}
      {moreThanOne && (
        <>
          <br />
          <span className="text-muted text-light font-weight-light">
            (You can choose more than 1)
          </span>
        </>
      )}
    </label>
    <div className="row col">
      {options.map(({ text }, index) => (
        <div className={classes} key={index}>
          <input type={type} className="custom-control-input" />
          <label className="custom-control-label">{text}</label>
        </div>
      ))}
    </div>
  </div>
);
