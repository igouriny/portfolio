import React from 'react';
import profilePic from "./assets/profile_placeholder.png";
import github from "./assets/github.png";
import linkedin from "./assets/linkedin.png";
import GoogleTranslateDropdown from './googleTranslate/GoogleTranslateLoader';
function Navbar({ setActiveSection }) {
  return (
    <header>
      <img className="profile" src={profilePic} alt="profile picture" />
      <ul className="main-nav">
        <li className="about" onClick={() => setActiveSection('about')}>
          About
        </li>
        <li className="academic" onClick={() => setActiveSection('academic')}>
          Academic
        </li>
        <li className="professional" onClick={() => setActiveSection('professional')}>
          Professional
        </li>
        <li className="contact" onClick={() => setActiveSection('contact')}>
          Contact
        </li>
        <li className="about" onClick={() => setActiveSection('testimonials')}>
          Testimonials
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
