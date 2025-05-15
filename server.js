const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require("path");

const app = express();
const port = 5000 || process.env.PORT;

//require('dotenv').config();


// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Route to handle form submission
app.post('/api/submit', (req, res) => {
    
        res.send('Data saved successfully into mySQL!');  
    
});

// Route to handle login requests
app.get('/api/login_request', (req, res) => {
   
        res.send('Data saved successfully into mySQL!');
        //notify the app that the user is logged in and retrieve the corresping data from the client key
        
    
});

app.use(express.static(path.join(__dirname, "public")));

// Optional: fallback 404 for unknown API routes
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API route not found' });
});


// Start the server
app.listen(port, () => {
    console.log(`Server running an port :${port}`);
});

