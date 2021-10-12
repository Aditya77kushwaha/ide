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

let lang= 3;
app.post('/compile', (req, res) => {
    console.log(req.body);
    compiler.init()
    if(req.body.lang==='c')lang=1;
    if (req.body.lang === "c++" || req.body.lang === "cpp") lang = 2;
    if (req.body.lang === "python" || req.body.lang === "py") lang = 3;
    if(req.body.lang==='java')lang=4;

    compiler.compile(lang, req.body.code, req.body.input, (data) => {
        console.log(data);
        res.json({ data: data })
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})