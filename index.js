// app.js (Node.js and Express)

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

//database 
mongoose.connect(process.env.db, { useNewUrlParser: true, useUnifiedTopology: true });
const contentSchema = new mongoose.Schema({
    content: String,
    randomNumber: Number
});
const Content = mongoose.model('Content', contentSchema);


app.get('/', function(req, res) {res.render('home');});
  
app.post('/storeContent', async (req, res) => {
    const { content, randomNumber } = req.body;
    // Save content to MongoDB
    await Content.create({ content, randomNumber });
    res.status(200).json({ success: true, message: 'Content saved successfully' });
});

app.get('/getContent', async (req, res) => {
    const { number } = req.query;

    // Retrieve content from MongoDB based on the random number
    const content = await Content.findOne({ randomNumber: number });

    if (content) {
        res.status(200).json({ success: true, content: content.content });
    } else {
        res.status(404).json({ success: false, message: 'Content not found' });
    }
});


app.listen(3000, () => {
    console.log('Server started on port 3000');
});
