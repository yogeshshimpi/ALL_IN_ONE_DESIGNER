import "./Landing_page.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/logo white.png";
import menu from "../assets/menu.svg";
import arrowForWhite from "../assets/arrow_forward_white.svg";
import arrowFor from "../assets/arrow_forward.svg";
import dwo from "../assets/design-with-friend.png";

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

const Landing_page = () => {
  const navigate = useNavigate()
  const width = useWindowWidth();
  const [dropDown, setDropDown] = useState(false);
  const [btnClone, setBtnClone] = useState(false);
  const arrayTool = [
    "Word",
    "PPT",
    "Excel",
    "Website",
    "Resume Maker",
    "Poster Maker",
  ];
  const [toolImage, setToolImage] = useState("Word");

  const handleToolImage = (index) => setToolImage(arrayTool[index]);

  const handleBtnClone = () => {
    setBtnClone(true);
    setTimeout(() => {
      setBtnClone(false);
      navigate('/sign-up')
    }, 1000);
  };

  const handleDropDown = () => setDropDown(!dropDown);

  const handleRedirectHome = async() =>{
    const res = await fetch(`${process.env.API_URL}api/get-cookie`,{
      method:'POST',
      credentials:'include',
    })
    const data = await res.json()
    const userDetail = data.data
    const response = await fetch(`${process.env.API_URL}api/redirect-home`,{
      method:'POST',
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify(userDetail),
    })

    const result = await response.json()
    if(result.message){
      navigate('./home')
    }
      
  }
  handleRedirectHome()
  return (
    <section className="landing-page">
      <section className="sec">
      <nav>
        <div className="logo-side">
          <img src={logo} className="image" alt="Logo" />
          <div className="text">All In One Designer</div>
        </div>
        {width <= 650 ? (
          <div className="nav-btn-sec">
            <button
              className="nav-btn"
              aria-label="Toggle menu"
              onClick={handleDropDown}>
              <img src={menu} alt="Menu icon" />
            </button>
            <ul
              style={{
                opacity: dropDown ? "100%" : "0%",
                transitionDuration: "0.5s",
              }}>
              <li>Product</li>
              <li>Tutorial</li>
              <li>About</li>
              <li>Contact Us</li>
            </ul>
          </div>
        ) : (
          <ul className="navigation">
            <li>
              <Link href="">
                Product <span></span>
              </Link>
            </li>
            <li>
              <Link href="">
                Tutorial <span></span>
              </Link>
            </li>
            <li>
              <Link href="">
                About <span></span>
              </Link>
            </li>
            <li>
              <Link href="">
                Contact Us <span></span>
              </Link>
            </li>
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
            <img
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
            <button
              key={index}
              className={`btn${index}`}
              onClick={() => handleToolImage(index)}>
              {tool}
            </button>
          ))}
        </div>
      </section>

      <section className="dwo">
        <img className="dwo-image" src={dwo} alt="Design With Friends" />
        <div className="dwo-text">
          <div className="heading">Design With Others</div>
          <div className="paragraph">
            Invite friends and family members to design with you. Set your whole
            team to work together.
          </div>
        </div>
      </section>

      <section className="get-started-sec">
        <div className="text">Start Design with All In One Designer</div>
        <button className="get-started" onClick={handleBtnClone}>
          <div className="btn-1">Get Started</div>
          <div className="btn-2">
            <img
              src={arrowFor}
              width={20}
              className={btnClone ? "image-2" : ""}
              alt="Arrow Forward"
            />
          </div>
        </button>
      </section>
      </section>
    </section>
  );
};

export default Landing_page;
