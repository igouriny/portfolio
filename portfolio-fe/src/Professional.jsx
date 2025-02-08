import { useEffect, useState } from "react";
import axiosInstance from "../src/api/axiosInstance";
import DownloadCV from "./CVDownload"; // Import the CV download component

function Professional() {
    const [professionalData, setProfessionalData] = useState([]);

    useEffect(() => {
        axiosInstance.get("/professional")
            .then(response => setProfessionalData(response.data))
            .catch(error => console.error("Error fetching professional records:", error));
    }, []);

    return (
        <div className="body">
            <div className="content">
                <br />
                <h4 className="subtitle">PROFESSIONAL EXPERIENCE</h4>
                <hr className="break" />
                {professionalData.map((professional, index) => (
                    <div key={index} className="study-heading">
                        <div>
                            <h4 className="study-title">{professional.title}</h4>
                            <h5 className="study-subtitle">{professional.years}</h5>
                            <p className="study-description">{professional.description}</p>
                        </div>
                    </div>
                ))}

                                {/* Add a break and then display the Download CV component */}
                <br />
                <hr className='break' />
                <DownloadCV /> {/* Downloadable CVs section */}
            </div>
        </div>
    );
}

export default Professional;
