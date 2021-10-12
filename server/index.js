const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require("cors");
const compiler = require('compile-code');

app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());

const port = 30001

app.post('/compile', (req, res) => {
    console.log(req.body);
    compiler.init()

    compiler.compile(3, req.body.code, req.body.input, (data) => {
        console.log(data);
        res.json({ data: data })
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})