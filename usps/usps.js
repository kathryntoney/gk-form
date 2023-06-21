const express = require('express')
let app = express()

let port = 3005

let data = []

const cors = require('cors');
app.use(cors({
    origin: ['https://www.section.io', 'https://www.google.com/']
}));

app.get('/api', (req, res) => {
    res.json(data)
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})