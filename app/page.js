"use client";
import "./landing_page.css";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@/app/assets/logo black.png";
import menu from "@/app/assets/menu.svg";
import arrowForWhite from "@/app/assets/arrow_forward_white.svg";
import arrowFor from "@/app/assets/arrow_forward.svg";
import dwo from "@/app/assets/design-with-friend.png";

const useWindowWidth = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

export default function Home() {
  const width = useWindowWidth();
  const [dropDown, setDropDown] = useState(false);
  const [btnClone, setBtnClone] = useState(false);
  const arrayTool = ["Word", "PPT", "Excel", "Website", "Resume Maker", "Poster Maker"];
  const [toolImage, setToolImage] = useState("Word");

  const handleToolImage = (index) => setToolImage(arrayTool[index]);

  const handleBtnClone = () => {
    setBtnClone(true);
    setTimeout(() => setBtnClone(false), 1000);
  };

  const handleDropDown = () => setDropDown((prev) => !prev);

  return (
    <main>
      <section className="hero">
        <nav>
          <div className="logo-side">
            <Image src={logo} className="image" alt="Logo" />
            <div className="text">All In One Designer</div>
          </div>
          {width <= 650 ? (
            <div className="nav-btn-sec">
              <button className="nav-btn" aria-label="Toggle menu" onClick={handleDropDown}>
                <Image src={menu} alt="Menu icon" />
              </button>
              <ul className={`dropdown ${dropDown ? "visible" : "hidden"}`}>
                <li>Product</li>
                <li>Tutorial</li>
                <li>About</li>
                <li>Contact Us</li>
              </ul>
            </div>
          ) : (
            <ul className="navigation">
              <li>Product</li>
              <li>Tutorial</li>
              <li>About</li>
              <li>Contact Us</li>
            </ul>
          )}
          <div className="log-in-btn">
            <button className="btn-1">Log In</button>
          </div>
        </nav>

        <section className="welcome-sec">
          <div className="text-1">Welcome to,</div>
          <h1 className="text-2">All In One Designer</h1>
          <div className="text-3">Create Smarter, Innovate Faster!</div>
          <button className="get-started" onClick={handleBtnClone}>
            <div className="btn-1">Get Started</div>
            <div className="btn-2">
              <Image
                src={arrowForWhite}
                width={20}
                className={btnClone ? "image-2" : ""}
                alt="Arrow Forward"
              />
            </div>
          </button>
        </section>

        <section className="tool-sec">
          <div className="left-side">{toolImage}</div>
          <div className="right-side">
            {arrayTool.map((tool, index) => (
              <button key={index} className={`btn${index}`} onClick={() => handleToolImage(index)}>
                {tool}
              </button>
            ))}
          </div>
        </section>

        <section className="dwo">
          <Image className="dwo-image" src={dwo} alt="Design With Friends" />
          <div className="dwo-text">
            <div className="heading">Design With Others</div>
            <div className="paragraph">
              Invite friends and family members to design with you. Set your whole team to work together.
            </div>
          </div>
        </section>

        <section className="get-started-sec">
          <div className="text">Start Design with All In One Designer</div>
          <button className="get-started" onClick={handleBtnClone}>
            <div className="btn-1">Get Started</div>
            <div className="btn-2">
              <Image
                src={arrowFor}
                width={20}
                className={btnClone ? "image-2" : ""}
                alt="Arrow Forward"
              />
            </div>
          </button>
        </section>
      </section>
    </main>
  );
}
