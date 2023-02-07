const url = require("url");
const express = require("express");
const router = express.Router();
const needle = require("needle");
const apicache = require("apicache");

// Env vars
const API_BASE_URL = "https://re.jrc.ec.europa.eu/api/PVcalc";

// init cache
let cache = apicache.middleware;

router.get('/', cache('2 minute'), async (req, res) => {
    try {
        // console.log(url.parse(req.url,true).query);
        const params = new URLSearchParams({
            // [API_KEY_NAME]: API_KEY_VALUE,
            ...url.parse(req.url,true).query,
        });
        const apiRes = await needle('get', `${API_BASE_URL}?${params}`);
        const data = apiRes.body;

        //Log the request to the public API
        if(process.env.NODE_ENV !== "production"){
            console.log(`REQUEST: ${API_BASE_URL}?${params}`);
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({
            error
        });
    }

})


module.exports = router;