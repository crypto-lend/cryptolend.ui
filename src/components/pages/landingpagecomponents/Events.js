import React from "react";

const DATA = [
  {
    img:
      "https://media.shellypalmer.com/wp-content/images/2018/02/04064458/Webp.net-compress-image-1.jpg",
    title: "Sample Event",
    date: "7-8th Nov",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    img:
      "https://media.shellypalmer.com/wp-content/images/2018/02/04064458/Webp.net-compress-image-1.jpg",
    title: "Sample Event",
    date: "7-8th Nov",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    img:
      "https://media.shellypalmer.com/wp-content/images/2018/02/04064458/Webp.net-compress-image-1.jpg",
    title: "Sample Event",
    date: "7-8th Nov",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  }
];

export default function Events() {
  return (
    <div className="position-relative container mt-5">
      <div className="row">
        <div className="col-sm">
          <div
            style={{ textAlign: "center" }}
            className="card-header bg-transparent"
          >
            <h2 className="text-uppercase ls-1 text-primary py-3 mb-0">
              {" "}
              Events
            </h2>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        {DATA.map(({ img, title, date, text }, index) => (
          <div className="card col-12 my-3" key={index}>
            <div className="card-body">
              <div className="row align-items-start">
                <div className="col-auto pt-2">
                  <img
                    style={{
                      width: "12rem"
                    }}
                    className="img-thumbnail p-0"
                    alt={title}
                    src={img}
                  />
                </div>
                <div className="col ml--2">
                  <div className="mb-3 text-left">
                    <span className="h4">{title}</span>
                    <small className="float-right pt-2">{date}</small>
                  </div>
                  <p className="text-sm text-muted text-left mb-0">{text}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
