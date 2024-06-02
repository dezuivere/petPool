import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './NewPet.css'; // Import your custom CSS for styling

const NewPet = () => {
    const [petName, setPetName] = useState("");
    const [petType, setPetType] = useState("");
    const [petDescription, setPetDescription] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('petName', petName);
            formData.append('petType', petType);
            formData.append('petDescription', petDescription);
           

            const response = await axios.post("http://localhost:8000/api/pets", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            console.log(response.data);
            navigate("/pets");
        } catch (err) {
            console.error(err);
            setErrors(err.response.data.errors);
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div className="container">
            <div className="header">
                <h1>Pet Shelter</h1>
                <Link to="/pets">Home</Link>
            </div>
            <div className="sub-header">
                <h3>Know a pet needing a home?</h3>
            </div>
            <form className="form" onSubmit={onSubmitHandler}>
                <label htmlFor="petName">Pet Name:</label>
                <input
                    type="text"
                    id="petName"
                    name="petName"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                />
                {errors.petName ? <span>{errors.petName.message}</span> : null}

                <label htmlFor="petType">Pet Type:</label>
                <input
                    type="text"
                    id="petType"
                    name="petType"
                    value={petType}
                    onChange={(e) => setPetType(e.target.value)}
                />
                {errors.petType ? <span>{errors.petType.message}</span> : null}

                <label htmlFor="petDescription">Pet Description:</label>
                <textarea
                    id="petDescription"
                    name="petDescription"
                    value={petDescription}
                    onChange={(e) => setPetDescription(e.target.value)}
                />
                {errors.petDescription ? <span>{errors.petDescription.message}</span> : null}

                <label htmlFor="image">Upload Image:</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {errors.image ? <span>{errors.image.message}</span> : null}

                <button type="submit">Add Pet</button>
            </form>
        </div>
    );
};

export default NewPet;
