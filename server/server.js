const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8000;

const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// app.use('/uploads', express.static('uploads'));


app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

require("./config/mongoose.config")
require("./routes/pet.routes")(app)
    
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
