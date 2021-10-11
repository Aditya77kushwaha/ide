const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require("cors");

app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());

const port = 30001

app.post('/', (req, res) => {
    console.log(req.body);
    res.json({got:"true"})
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})