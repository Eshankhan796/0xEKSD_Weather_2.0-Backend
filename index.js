// Welcome to the 0xEKSD_Weather_2.0 Backend code base

// Packages
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const path = require("path");

// Constants
const app = express();
const PORT = 6464;
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
	connectionString,
	ssl: {
		rejectUnauthorized: false,
	},
});
// App

app.use(express.json());
app.use(cors());

pool.connect((err) => {
	if (err) {
		console.error("Error connecting to PostgreSQL:", err);
	} else {
		console.log("Connected to PostgreSQL");
	}
});

// Routes

// root /
app.get("/", (req, res) => {
	res.status(200).sendFile(path.join(__dirname, "index.html"));
	res.type("html");
});

// Geo Location
app.post("/gl", async (req, res) => {
	const { uuid, latitude, longitude, accuracy } = req.body;
	try {
		const query =
			"INSERT INTO geolocation (uuid, latitude, longitude, accuracy) VALUES ($1, $2, $3, $4)";
		const values = [uuid, latitude, longitude, accuracy];
		await pool.query(query, values);
		res.sendStatus(200);
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

// User Agent
app.post("/ua", async (req, res) => {
	const { uuid, user_agent, screen_width, screen_height,  screen_orientation} = req.body;
	try {
		const query = "INSERT INTO useragent (uuid, user_agent, screen_height, screen_width, screen_orientation) VALUES ($1, $2, $3, $4, $5)";
		const values = [uuid, user_agent, screen_height, screen_width, screen_orientation];
		await pool.query(query, values);
		res.sendStatus(200);
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

// IP Address
app.post("/ip", async (req, res) => {
	const { uuid, ip_address } = req.body;
	try {
		const query = "INSERT INTO ipaddress (uuid, ip_address) VALUES ($1, $2)";
		const values = [uuid, ip_address];
		await pool.query(query, values);
		res.sendStatus(200);
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

// IPGeolocation API
app.post("/ipgeo", async (req, res) => {
	const { uuid, ip_address, user_agent } = req.body;
	try {
		const query =
			"INSERT INTO ipgeolocationapi (uuid, ip_address_api,  user_agent_api) VALUES ($1, $2, $3)";
		const values = [uuid, ip_address, user_agent];
		await pool.query(query, values);
		console.log(req.body);
		res.sendStatus(200);
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

// Start Server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
