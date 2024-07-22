require('dotenv').config();

const express = require('express');

const cors = require('cors');

const app = express();

app.use(cors({}));

app.use(express.json());

app.use(express.static('public'));

const userRotes = require('./routes/UserRoutes');
const skillRotes = require('./routes/SkillRoutes');
const projetcRotes = require('./routes/ProjectRoutes');
const ratingRotes = require('./routes/RatingRoute');
const postRoutes = require('./routes/PostRoutes');
const levelRoutes = require('./routes/LevelRoutes');
const questionRoutes = require('./routes/QuestionRoutes');
const responseRoutes = require('./routes/ResponseRoutes');
const imagesProjectRoutes = require('./routes/ImagesProjectRoutes');
const docsProjectRoutes = require('./routes/DocsProjectRoutes');
const phoneRoutes = require('./routes/PhoneRoutes');
const addressRoute = require('./routes/AddressRoutes');
const notificatioRoutes = require('./routes/NotificationRoutes');

app.use('/users', userRotes);
app.use('/skills', skillRotes);
app.use('/projects', projetcRotes);
app.use('/ratings', ratingRotes);
app.use('/posts', postRoutes);
app.use('/levels', levelRoutes);
app.use('/questions', questionRoutes);
app.use('/responses', responseRoutes);
app.use('/imagesproject', imagesProjectRoutes);
app.use('/docsproject', docsProjectRoutes);
app.use('/phones', phoneRoutes);
app.use('/address', addressRoute);
app.use('/notifications', notificatioRoutes);

app.listen(5555);
