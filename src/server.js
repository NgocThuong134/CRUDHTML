const express = require('express');
const mongoose = require('mongoose');
var path = require('path');
require('dotenv').config();
const restaurantsRoutes = require('./routes/restaurants');

mongoose.Promise = global.Promise;
const app = express();
const port = 3040;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(restaurantsRoutes);
app.use('/assets', express.static(__dirname + '/public'));
const mongoddb_uri = 'mongodb+srv://ngocthuong:WwiNYGR3gVyVLEF3@atlascluster.dicjzo3.mongodb.net/Restaurant';
mongoose
    .connect(mongoddb_uri, { useNewUrlParser: true, useUnifiedTopology: true, autoCreate: false })
    .then(() => console.log('Connected to MongoDB Atlas!'))
    .catch(error => console.error(error));

app.listen(port, () => console.log(`Server running on port ${port}`));