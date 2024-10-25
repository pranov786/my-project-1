const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://pranov777prahaladh:kHgiQrKPIhj57Ul8@cluster0.td8iy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => console.error(err));

// Comment Schema
const commentSchema = new mongoose.Schema({
  username: String,
  content: String,
  createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);

// Get comments
app.get('/comments', async (req, res) => {
  const comments = await Comment.find().sort({ createdAt: -1 });
  res.json(comments);
});

// Post a comment
app.post('/comments', async (req, res) => {
  const { username, content } = req.body;
  const newComment = new Comment({ username, content });
  await newComment.save();
  res.status(201).json(newComment);
});

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
});

// Specific routes for each car page
app.get('/g-powered-m5-f90', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views','G_POWERED_M5_F90.html'));
});

app.get('/manhart-m5-f90', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views','MANHART_M5_F90.html'));
});

// Add routes for all other car pages
app.get('/sf90-redmatt', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','views', 'SF90_RedMatt.html'));
});

app.get('/mansory-mclaren-720s', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views','mansory_mclaren_720s.html'));
});

app.get('/mansory-xm', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','views', 'mansory_xm.html'));
});

app.get('/koenigsegg-rs', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','views', 'koenigsegg_rs.html'));
});

app.get('/jesko-attack', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','views', 'jesko_attack.html'));
});

app.get('/la-ferrari', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','views', 'la_ferrari.html'));
});

app.get('/lamborghini-aventador-svj63', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views','lamborghini_aventador_svj63.html'));
});

app.get('/audi-rs6', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','views', 'audi_rs6.html'));
});

app.get('/porsche-918-spyder', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','views', 'porsche_918_spyder.html'));
});

app.get('/lamborghini-veneno-roadster', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','views', 'lamborghini_veneno_roadster.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
