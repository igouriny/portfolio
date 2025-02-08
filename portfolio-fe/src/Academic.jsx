import { useEffect, useState } from "react";
import axiosInstance from "../src/api/axiosInstance";
import "../src/Academic.css";
import DownloadCV from "./CVDownload"; // Import the CV download component

function Academic() {
    const [academics, setAcademics] = useState([]);

    useEffect(() => {
        axiosInstance.get("/academics")
            .then(response => setAcademics(response.data))
            .catch(error => console.error("Error fetching academic records:", error));
    }, []);

    return (
        <div className="body">
            <div className="content">
                <br />
                <h4 className='subtitle'>STUDIES</h4>
                <hr className='break' />
                {academics.map((academic, index) => (
                    <div key={index} className='study-heading'>
                        <div>
                            <h4 className='study-title'>{academic.title}</h4>
                            <h5 className='study-subtitle'>{academic.years}</h5>
                            <p className='study-description'>{academic.description}</p>
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

export default Academic;
