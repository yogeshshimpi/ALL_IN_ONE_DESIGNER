import "./project.css";
import word from '../../assets/word.svg'
import ppt from '../../assets/ppt.svg'
import excel from '../../assets/excel.svg'
import website from '../../assets/website.svg'
import resumemaker from '../../assets/resumemaker.svg'
import custom from '../../assets/custom.svg'

const Project = () => {
  return (
    <div className="project">
      <div className="welcome-sec">
        <div className="welcome-text">Welcome to,</div>
        <div className="web-name">All IN ONE DESIGNER</div>
      </div>
      <div className="tools-sec">
        <button className="tools"><img src={word} alt="" />Docs</button>
        <button className="tools"><img src={ppt} alt="" />Presentation</button>
        <button className="tools"><img src={excel} alt="" />Excel</button>
        <button className="tools"><img src={website} alt="" />Website builder</button>
        <button className="tools"><img src={resumemaker} alt="" />Resume maker</button>
        <button className="tools"><img src={custom} alt="" />Custom</button>
      </div>
    </div>
  );
};

export default Project;
