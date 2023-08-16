const express = require("express")
const serverless = require("serverless-http")

const app = express()

const router = express.Router()

router.get("/", (req, res) => {
	return res.json({
		hello: "hi",
	})
})

app.use("/.netlify/functions/api", router)

module.exports.handler = serverless(app)
