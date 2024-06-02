const Pet = require('../models/pet.model');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const UPLOADS_DIR = path.join(__dirname, '../uploads');
        cb(null, UPLOADS_DIR);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage }).single('image');

module.exports = {

    getAllPets: (req, res) => {
        Pet.find()
            .sort({ petType: 1 })
            .then(allPets => res.json(allPets))
            .catch(err => res.json({ message: "Something went wrong with getAllPets", error: err }));
    },

    getOnePet: (req, res) => {
        Pet.findOne({ _id: req.params.id })
            .then(onePet => res.json(onePet))
            .catch(err => res.json({ message: "Something went wrong with getOnePet", error: err }));
    },

    createPet: (req, res) => {
        upload(req, res, err => {
            if (err) {
                console.log("Something went wrong with file upload", err);
                return res.status(500).json({ message: "Something went wrong with file upload", error: err });
            }

            const { petName, petType, petDescription } = req.body;
            const newPet = {
                petName,
                petType,
                petDescription,
                imageUrl: req.file ? req.file.path : null // Save the path of the uploaded image
            };

            Pet.create(newPet)
                .then(pet => res.json(pet))
                .catch(err => res.status(400).json(err));
                console.log("success added pet");
        });
    },

    updatePet: (req, res) => {
        Pet.findOneAndUpdate(
            { _id: req.params.id }, req.body,
            {
                new: true,
                runValidators: true,
            }
        )
            .then(updatePet => res.json(updatePet))
            .catch(err => res.status(400).json(err));
    },

    deletePet: (req, res) => {
        Pet.deleteOne({ _id: req.params.id })
            .then(deletePet => res.json(deletePet))
            .catch(err => res.json({ message: "Something went wrong with deletePet", error: err }));
    }
};
