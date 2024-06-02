import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './EditPet.css';

const EditPet = () => {
  const { id } = useParams();
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [petDescription, setPetDescription] = useState("");
  const [image, setImage] = useState(null);  // New state for image

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/pets/${id}`)
      .then((response) => {
        console.log(response.data);
        setPetName(response.data.petName);
        setPetType(response.data.petType);
        setPetDescription(response.data.petDescription);
      })
      .catch((err) => {
        console.log(err);
        navigate("/error");
      });
  }, [id, navigate]);

  const onUpdateHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('petName', petName);
    formData.append('petType', petType);
    formData.append('petDescription', petDescription);
    if (image) {
      formData.append('image', image);  // Append image to form data
    }

    axios.put(`http://localhost:8000/api/pets/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log(response.data);
        navigate(`/pets/${response.data._id}`);
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Pet Shelter</h1>
        <p>
          <Link to="/pets">Home</Link>
        </p>
      </div>
      <div className="sub-header">
        <h3>Edit {petName}</h3>
      </div>

      <form className="form" onSubmit={onUpdateHandler}>
        <div className="form-group">
          <label htmlFor="petName">Pet Name</label>
          <input
            type="text"
            id="petName"
            name="petName"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
          />
          {errors.petName && <span>{errors.petName.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="petType">Pet Type</label>
          <input
            type="text"
            id="petType"
            name="petType"
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
          />
          {errors.petType && <span>{errors.petType.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="petDescription">Pet Description</label>
          <textarea
            id="petDescription"
            name="petDescription"
            value={petDescription}
            onChange={(e) => setPetDescription(e.target.value)}
          />
          {errors.petDescription && <span>{errors.petDescription.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="image">Pet Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}  // Update image state
          />
          {errors.image && <span>{errors.image.message}</span>}
        </div>

        <button type="submit">Update Pet</button>
      </form>
    </div>
  );
};

export default EditPet;
