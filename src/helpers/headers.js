require("dotenv").config()

// env variables
const API_USER = process.env.API_USER
const API_PASS = process.env.API_PASS

// headers to pass basic auth to api
const options = {
	headers: {
		Authorization: `Basic ${Buffer.from(`${API_USER}:${API_PASS}`).toString(
			"base64"
		)}`,
	},
}

module.exports = options
