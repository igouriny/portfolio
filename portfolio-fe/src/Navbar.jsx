import React from 'react';
import profilePic from "./assets/profile.jpg";
import github from "./assets/github.png";
import linkedin from "./assets/linkedin.png";
import GoogleTranslateDropdown from './googleTranslate/GoogleTranslateLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faGraduationCap, 
  faBriefcase, 
  faEnvelope, 
  faComments 
} from '@fortawesome/free-solid-svg-icons';

function Navbar({ setActiveSection }) {
  return (
    <header>
      <img className="profile" src={profilePic} alt="profile" />
      <ul className="main-nav">
        <li className="about" onClick={() => setActiveSection('about')}>
          <span className="nav-icon">
            <FontAwesomeIcon icon={faUser} />
          </span>
          <span className="nav-text">About</span>
        </li>
        <li className="academic" onClick={() => setActiveSection('academic')}>
          <span className="nav-icon">
            <FontAwesomeIcon icon={faGraduationCap} />
          </span>
          <span className="nav-text">Academic</span>
        </li>
        <li className="professional" onClick={() => setActiveSection('professional')}>
          <span className="nav-icon">
            <FontAwesomeIcon icon={faBriefcase} />
          </span>
          <span className="nav-text">Professional</span>
        </li>
        <li className="contact" onClick={() => setActiveSection('contact')}>
          <span className="nav-icon">
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
          <span className="nav-text">Contact</span>
        </li>
        <li className="about" onClick={() => setActiveSection('testimonials')}>
          <span className="nav-icon">
            <FontAwesomeIcon icon={faComments} />
          </span>
          <span className="nav-text">Testimonials</span>
        </li>
        <li className="language">
          <GoogleTranslateDropdown />
        </li>
      </ul>
      <div className="bottom-header">
        <ul className="bottom-nav">
          <li className="bottom-nav-list">
            <a href="https://github.com/igouriny" target="_blank" rel="noopener noreferrer">
              <img src={github} alt="github" className="github" />
            </a>
          </li>
          <li className="bottom-nav-list">
            <a href="https://linkedin.com/in/ilyass-gouriny" target="_blank" rel="noopener noreferrer">
              <img src={linkedin} alt="linkedin" className="linkedin"/>
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
