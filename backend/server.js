const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv=require('dotenv');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI ;
const router = require("./routes/toto");
app.use(cors());
app.use(express.json());

app.use('/api/todos', router);

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(5000, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.log(err));
