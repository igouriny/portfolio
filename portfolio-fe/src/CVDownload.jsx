import React from "react";
import { FaDownload } from "react-icons/fa"; // Import download icon
// import "./DownloadCV.css"; // Make sure the styles are applied

function DownloadCV() {
  return (
    <div className="cv-container">
      <div className="cv-buttons">
        <a href="/Ilyass_Gouriny_CV.pdf" download="Ilyass_Gouriny_CV_EN.pdf" className="cv-button">
          <FaDownload /> Download my English CV
        </a>
        <a href="/Ilyass_Gouriny_CV_French.pdf" download="Ilyass_Gouriny_CV_French.pdf" className="cv-button">
          <FaDownload /> Télécharger mon CV en Français
        </a>
      </div>
    </div>
  );
}

export default DownloadCV;
