const mongoose = require('mongoose');

const username = encodeURIComponent('petPool');
const password = encodeURIComponent('pet@0000');
const clusterUrl = 'petpool.4qyotzu.mongodb.net';
const dbname = 'petPool';

const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log(`Successfully connected to the ${dbname} database`))
.catch((err) => console.error("Something went wrong when connecting to the database", err));
