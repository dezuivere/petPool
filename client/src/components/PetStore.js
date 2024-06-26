import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaInfoCircle, FaEdit, FaSearch } from "react-icons/fa"; // Import icons from React Icons
import "./PetStore.css";

const PetStore = () => {
  const [allPets, setAllPets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pets")
      .then((response) => {
        console.log(response.data);
        setAllPets(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPets = allPets.filter(
    (pet) =>
      pet.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.petType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <div className="header">
        <h1>petPool</h1>
        <input
          type="text"
          placeholder="Search pets..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <FaSearch className="search-icon" />
        <Link to="/pets/new">Add Pet</Link>
      </div>
      <div className="sub-header">
        <h3>These pets are looking for a good home</h3>
      </div>
      <div className="pet-cards">
        {filteredPets.map((pet, index) => (
          <div key={index} className="pet-card">
            <div className="pet-image">
              <img
                src={`http://localhost:8000/${pet.imageUrl}`}
                alt={pet.petName}
              />
            </div>

            <div className="pet-info">
              <h2>{pet.petName}</h2>
              <p>Type: {pet.petType}</p>
              <div className="actions">
                <Link to={`/pets/${pet._id}`}>
                  <button className="btn details">
                    <FaInfoCircle /> Details
                  </button>
                </Link>
                <Link to={`/pets/edit/${pet._id}`}>
                  <button className="btn edit">
                    <FaEdit /> Edit
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetStore;
