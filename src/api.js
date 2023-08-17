const express = require("express")
const serverless = require("serverless-http")
const options = require("./helpers/headers")
const needle = require("needle")
require("dotenv").config()

// env variables

const app = express()

const router = express.Router()

const API_BASE_URL = process.env.API_BASE_URL

router.get("/search/:code", async (req, res) => {
	try {
		// get CRS code from station query in URL
		const stationCode = req.params.code

		// construct URL to make request
		const apiRes = await needle(
			`${API_BASE_URL}/search/${stationCode}`,
			options
		)
		const data = apiRes.body
		res.status(200).json(data)
	} catch (error) {
		res.status(500).json({error})
	}
})

router.get("/service/:serviceid/:year/:month/:date", async (req, res) => {
	try {
		// get SERVICE ID, year, month, and date date from in URL
		const serviceID = req.params.serviceid
		const year = req.params.year
		const month = req.params.month
		const date = req.params.date

		// construct URL to make request
		const apiRes = await needle(
			`${API_BASE_URL}/service/${serviceID}/${year}/${month}/${date}`,
			options
		)
		const data = apiRes.body
		res.status(200).json(data)
	} catch (error) {
		res.status(500).json({error})
	}
})

app.use("/.netlify/functions/api", router)

module.exports.handler = serverless(app)
