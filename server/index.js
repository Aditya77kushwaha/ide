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

app.post('/', (req, res) => {
    console.log(req.body);
    compiler.init()

    compiler.compile(2, '#include <iostream>\n using namespace std;\n int main() {\ncout << "Hello World";\nreturn 0;\n}', "", (data) => {
        console.log(data);
        res.json({ data: data })
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})