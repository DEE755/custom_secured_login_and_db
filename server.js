const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require("path");

const app = express();
const port = 5000 || process.env.PORT;

//require('dotenv').config();

app.use(express.static(path.join(__dirname, "public")));

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Route to handle form submission
app.post('/api/submit', (req, res) => {
    const { username, password } = req.body;

    // Insert data into the database
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    connection.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error saving data to the database.');
            return;
        }
        console.log('Data inserted:', results);
        res.send('Data saved successfully into mySQL!');  
    });
});

// Route to handle login requests
app.get('/api/login_request', (req, res) => {
    //console.log('reached the endpoint /login_request');
    const { username, password } = req.query;
    //console.log('identifiers', username, password);

    // Retrieve data from the database
    const query = `SELECT * FROM users WHERE username = '${username}'AND password = '${password}'`;

    connection.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error retrieving data:', err);
            res.status(500).send('Error retrieving data from the database.');
            return;
        }

        if (results.length === 0) {
            //console.log('No matching user found.');
            res.status(401).send('Invalid username or password.');
            return;
        }
        else {
            console.log('User found:', results);
        
        //console.log(results);
        res.send(results);
        //notify the app that the user is logged in and retrieve the corresping data from the client key
        
        }

    });
});



// Start the server
app.listen(port, () => {
    console.log(`Server running an port :${port}`);
});

