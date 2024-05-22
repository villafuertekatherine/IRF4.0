import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../css/CensusPage.css'; // Create and style this CSS file as needed

const CensusPage = () => {
    const location = useLocation();
    const [censusData, setCensusData] = useState([]);

    useEffect(() => {
        const fetchCensusData = async () => {
            const { censusDate } = location.state;
            try {
                const response = await axios.get(`http://localhost:8080/api/census`, {
                    params: { censusDate }
                });
                setCensusData(response.data || []);
            } catch (error) {
                console.error('Failed to fetch census data:', error);
            }
        };

        if (location.state && location.state.censusDate) {
            fetchCensusData();
        }
    }, [location.state]);

    return (
        <div className="census-container">
            <h1>Census Page</h1>
            <section>
                <h2>Census Data for {location.state?.censusDate}</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Room Number</th>
                            <th>Admission Date</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Sex</th>
                            <th>Plan</th>
                            <th>DX</th>
                        </tr>
                    </thead>
                    <tbody>
                        {censusData.map((data, index) => (
                            <tr key={index}>
                                <td>{data.roomNumber}</td>
                                <td>{data.admissionDate}</td>
                                <td>{data.name}</td>
                                <td>{data.age}</td>
                                <td>{data.sex}</td>
                                <td>{data.plan}</td>
                                <td>{data.dx}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default CensusPage;
