const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const users = [];

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (users.some((user) => user.username === username)) {
        return res.status(400).json({ error: 'Username already exists' });
    }

    users.push({ username, password });
    res.json({ message: 'Registration successful' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists
    const user = users.find((user) => user.username === username);

    if (!user) {
        return res.status(401).json({ error: 'Username does not exist' });
    }

    // Check if the password is correct
    if (user.password !== password) {
        return res.status(401).json({ error: 'Incorrect password' });
    }

    res.json({ message: 'Login successful' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.post('/saveData', (req, res) => {
    const { username, password, gold, numOfFoodBowls, numOfWaterBottles, piggies } = req.body;
    const piggiesString = JSON.stringify(piggies);

    // Perform file I/O operations here
    fs.writeFileSync(`../SaveFiles/${username}.json`, `{\n   "Username": "${username}",\n   "Password": "${password}",\n   "Gold": "${gold}",\n   "numOfFoodBowls": "${numOfFoodBowls}",\n   "numOfWaterBottles": "${numOfWaterBottles}",\n   "Piggies": ${piggiesString}\n}`);

    res.json({ message: 'Data saved successfully' });
});

app.get('/fetchUserData', (req, res) => {
    const username = req.query.username;

    // You should implement logic here to read user data from the file
    // and send it back in the response
    // For simplicity, let's assume you have a function that reads the data
    const userData = readUserDataFromFile(username);

    // Set the Content-Type header to "application/json"
    res.header('Content-Type', 'application/json');

    // Send the data back to the client
    res.json(userData);
});

// Example function to read user data from a file
function readUserDataFromFile(username) {
    const fs = require('fs');
    const path = `../SaveFiles/${username}.json`;

    try {
        if (fs.existsSync(path)) {
          const data = fs.readFileSync(path, 'utf8');
          return JSON.parse(data);
        } else {
          console.error(`User data file not found for ${username}`);
          return { error: 'User data not found' };
        }
      } catch (error) {
        console.error(`Error reading user data: ${error.message}`);
        return { error: 'Failed to read user data' };
      }
}

