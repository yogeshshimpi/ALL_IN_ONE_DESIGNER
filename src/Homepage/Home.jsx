import "./Home.css";
import logo from "../assets/logo white.png";
import search_icon from "../assets/search-icon.svg";
import account_circle from "../assets/account_circle.svg";
import menu from "../assets/menu.svg";
import create from "../assets/create.svg";
import team_project from "../assets/Team project.svg";
import upload_project from "../assets/upload_project.svg";
import project_icon from "../assets/project.svg";
import project_template from "../assets/project_template_fill.svg"
import { Outlet , Link } from "react-router-dom";
import { useState } from "react";


const Home = () => {
    const [minLeftSide,setMinLeftSide] = useState(false)
    const [hideText,sethideText] = useState(false)
    const [btnDisabled,setBtnDisabled] = useState(false)
    const handleLeftSide = () =>{
      setBtnDisabled(true)
      setMinLeftSide(!minLeftSide)
      if(minLeftSide){
        setTimeout(() => {
          sethideText(false)
        }, 200);
      }else{
        sethideText(true)
      }
      setTimeout(() => {
        setBtnDisabled(false)
      }, 400);
    }
  return (
    <section className="home">
      <section className="main">
        <nav>
          <div className="logo-sec">
            <img src={logo} alt="" className="logo-img" />
            <div className="logo-text ">All IN ONE DzESIGNER</div>
          </div>
          <div className="search-sec">
            <div className="search-field">
              <input type="text" />
              <button className="search">
                <img src={search_icon} alt="" />
              </button>
            </div>
          </div>
          <button className="user-sec">
            <img src={account_circle} alt="" />
            <div className="account_detail">
              <div className="username">Yogesh Shimpi</div>
              <div className="email">yogeshshimpi320@gmail.com</div>
            </div>
          </button>
        </nav>
        <section className="container">
          <div className={minLeftSide ? "left-side min-left-side" : "left-side"}>
            <div className="top-sec">
            <div className="slide-bar-btn">
              <button disabled={btnDisabled ? true :false} onClick={handleLeftSide}>
                <img src={menu} alt="" />
              </button>
            </div>
            <div className="create-style">
              <button>
                <img src={create} alt="" /> <span className={hideText ?"hide-text":""}>Create a Design</span> 
              </button>
            </div>
            <div className="prj-tab-sec">
            
              <button><Link className="a" to="/home"><img src={project_icon} alt="" /> <span className={hideText ?"hide-text":""}>Project</span> </Link></button>
              <button><Link className="a" to="/home/team-project"><img src={team_project} alt="" /> <span className={hideText ?"hide-text":""}>Team project</span> </Link></button>
              <button><Link className="a" to="/home/upload-project"><img src={upload_project} alt="" /> <span className={hideText ?"hide-text":""}>Uploaded project</span> </Link></button>
              <button><Link className="a" to="/home/project-template"><img src={project_template} alt="" /> <span className={hideText ?"hide-text":""}>Project template</span> </Link></button>
            </div>
          </div>
          <div className="down-sec">&#169; 2025 Yogesh Shimpi. All Rights Reserved.</div>
            </div>
          <div className="right-side">
            <Outlet/>
          </div>
        </section>
      </section>
    </section>
  );
};

export default Home;
