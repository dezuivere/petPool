const Pet = require('../models/pet.model');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

module.exports = {
    getAllPets: (request, response) => {
        Pet.find()
            .sort({ petType: 1 })
            .then((allPets) => {
                console.log(allPets);
                response.json(allPets);
            })
            .catch((err) => {
                console.log("Something went wrong with getAllPets");
                response.json({ message: "Something went wrong with getAllPets", error: err });
            });
    },

    getOnePet: (request, response) => {
        Pet.findOne({ _id: request.params.id })
            .then((onePet) => {
                console.log(onePet);
                response.json(onePet);
            })
            .catch((err) => {
                console.log("Something went wrong with getOnePet");
                response.json({ message: "Something went wrong with getOnePet", error: err });
            });
    },

    createPet: (request, response) => {
        upload.single('image')(request, response, (err) => {
            if (err) {
                console.log("Something went wrong with file upload");
                return response.status(500).json({ message: "Something went wrong with file upload", error: err });
            }

            const { petName, petType, petDescription} = request.body;
            const newPet = {
                petName,
                petType,
                petDescription,
                imageUrl: request.file ? 'uploads/' + request.file.filename : null // Save the relative path of the uploaded image
            };

            Pet.create(newPet)
                .then((pet) => {
                    console.log(pet);
                    response.json(pet);
                })
                .catch((err) => {
                    console.log("Something went wrong with createPet");
                    response.status(400).json(err);
                });
        });
    },

    updatePet: (request, response) => {
        upload.single('image')(request, response, (err) => {
            if (err) {
                console.log("Something went wrong with file upload");
                return response.status(500).json({ message: "Something went wrong with file upload", error: err });
            }

            const { petName, petType, petDescription } = request.body;
            const updateData = {
                petName,
                petType,
                petDescription
            };

            if (request.file) {
                updateData.imageUrl = 'uploads/' + request.file.filename;
            }

            Pet.findOneAndUpdate(
                { _id: request.params.id },
                updateData,
                {
                    new: true,
                    runValidators: true,
                }
            )
                .then((updatePet) => {
                    console.log(updatePet);
                    response.json(updatePet);
                    console.log("successfully updated pet!");
                })
                .catch((err) => {
                    console.log("Something went wrong with updatePet");
                    response.status(400).json(err);
                });
        });
    },

    deletePet: (request, response) => {
        Pet.deleteOne({ _id: request.params.id })
            .then((deletePet) => {
                console.log(deletePet);
                response.json(deletePet);
            })
            .catch((err) => {
                console.log("Something went wrong with deletePet");
                response.json({ message: "Something went wrong with deletePet", error: err });
            });
    }
};
