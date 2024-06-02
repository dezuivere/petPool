import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './PetDetails.css'; // Import the CSS file for styling

const PetDetails = () => {
    const [allPets, setAllPets] = useState([]);
    const { id } = useParams();
    const [pet, setPet] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${id}`)
            .then((response) => {
                console.log(response.data);
                setPet(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const adoptPetHandler = (id) => {
        axios.delete(`http://localhost:8000/api/pets/${id}`)
            .then((response) => {
                console.log(response.data);
                setAllPets(allPets.filter((pet) => pet._id !== id));
                navigate("/pets");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="container">
            <div className="row my-3">
                <div className="col text-start">
                    <h1>Pet Shelter</h1>
                </div>
                <div className="col text-end">
                    <Link to="/pets">Home</Link>
                </div>
            </div>
            <div className="row my-3 py-2">
                <div className="col text-start">
                    <h3 className="my-2">Details about: {pet.petName}</h3>
                </div>
                <div className="col text-end">
                    <button type="button" className="btn btn-danger my-2" onClick={() => adoptPetHandler(id)}>Adopt</button>
                </div>
            </div>
            <div className="row border">
                <div className="">
                    <div >
                        <img src={`http://localhost:8000/${pet.imageUrl}`} alt={pet.petName} className="pet-image-details" />
                    </div>
                </div>
                <div className="row text-start">
                    <div className="col-lg-4">
                        <p className="fw-bold">Pet Type:</p>
                    </div>
                    <div className="col-lg-4">
                        <p>{pet.petType}</p>
                    </div>
                </div>
                <div className="row text-start">
                    <div className="col-lg-4">
                        <p className="fw-bold">Pet Description:</p>
                    </div>
                    <div className="col-lg-4">
                        <p>{pet.petDescription}</p>
                    </div>
                </div>
                {/* <div className="row text-start">
                    <div className="col-lg-4">
                        <p className="fw-bold">Skills:</p>
                    </div>
                    <div className="col-lg-4">
                        <p>{pet.petSkillOne}</p>
                        <p>{pet.petSkillTwo}</p>
                        <p>{pet.petSkillThree}</p>
                    </div>
                </div> */}
                
            </div>
        </div>
    );
};

export default PetDetails;
