import React from "react";
import Navbar from "../Navbar";

const DATA = [
  {
    img:
      "https://media.shellypalmer.com/wp-content/images/2018/02/04064458/Webp.net-compress-image-1.jpg",
    title: "Malta AI & Blockchain Summit",
    date: "7-8th Nov",
    text:
      "Cryptolendr’s team are pleased to be attending the Malta AI & Blockchain Summit from 7-8th November. The summit will be showcasing the future of artificial intelligence, blockchain, big data, IoT and quantum technologies.",
    url: "https://maltablockchainsummit.com/"
  }
];

export default function Events({ background }) {
  return (
    <>
      <div className={`${background} pb-5`}>
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
            {DATA.map(({ img, title, date, text, url }, index) => (
              <div className={`card col-12 my-3 ${background}`} key={index}>
                <div className="card-body">
                  <div className="row align-items-start">
                    <div className="col-12 col-md-auto">
                      <img
                        style={{
                          width: "12rem"
                        }}
                        className="img-thumbnail p-0"
                        alt={title}
                        src={img}
                      />
                    </div>
                    <div className="col-12 col-md mt-4 mt-md-0 text-left">
                      <div className="mb-3 text-left">
                        <span className="h5">{title}</span>
                        <small className="float-right">{date}</small>
                      </div>
                      <p className="text-sm text-muted text-left mb-0">{text}</p>
                      <a href={url}>Link</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
