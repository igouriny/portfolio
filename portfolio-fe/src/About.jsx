import { useEffect, useState } from "react";
import axios from "axios";

function About() {
    const [aboutData, setAboutData] = useState(null);
    const aboutId = "1"; // Replace with actual ID or fetch dynamically

    useEffect(() => {
        // axios.get(`http://localhost:8080/api/v1/about/${aboutId}`)
        axios.get(`https://portfolio-production-ca67.up.railway.app/api/v1/about/${aboutId}`)
            .then((response) => {
                console.log("Fetched About Data:", response.data);
                setAboutData(response.data);
            })
            .catch((error) => console.error("Error fetching about data:", error));
    }, [aboutId]);

    if (!aboutData) {
        return <p>Loading...</p>;
    }

    return (
        <div className="body">
            <h1 className="title" translate="no">{aboutData.name}</h1>
            <h3 className="subtitle">{aboutData.subtitle}</h3>
            <div className="content">{aboutData.content}</div>
            <hr />
            <div className="sub-content">
                <div className="left-about">{aboutData.leftContent}</div>
                <div className="right-about">{aboutData.rightContent}</div>
            </div>
        </div>
    );
}

export default About;