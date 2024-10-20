// Welcome to the 0xEKSD_Weather_2.0 Backend code base

// Packages
const express = require('express');
const path = require('path');

// Constants
const app = express();
const PORT = process.env.PORT || 6464;

// App

app.use(express.json());

// Routes

// root /
app.get('/', (req, res) => {
	res.status(200).sendFile(path.join(__dirname, 'index.html'));
	res.type('html');
});

// Geo Location
app.post('/gl', (req, res) => {
	const {latitude, longitude, accuracy} = req.body;
	res.sendStatus(200);
});

// User Agent
app.post('/ua', (req, res) => {
	const {user_agent} = req.body;
	res.sendStatus(200);
});

// IP Address
app.post('/ip', (req, res) => {
	const {ip_address} = req.body;
	res.sendStatus(200);
});

// Screen Orientation 
app.post('/so', (req, res) => {
	const {screen_orientation} = req.body;
	res.sendStatus(200);
});

// Screen Size
app.post('/ss', (req, res) => {
	const {screen_size} = req.body;
	res.sendStatus(200);
});

// IPGeolocation API
app.post('/ipgeo', (req, res) => {
	const {ip_address, user_agent} = req.body;
	res.sendStatus(200);
})

// Start Server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
})