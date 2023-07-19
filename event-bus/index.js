const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/events', (req, res) => {
    const event = req.body;
    console.log(event);

    // posts
    axios
        .post('http://localhost:4000/events', event)
        .catch(err => console.log(err))

    // comments
    axios
        .post('http://localhost:4001/events', event)
        .catch(err => console.log(err))

    // query
    axios
        .post('http://localhost:4002/events', event)
        .catch(err => console.log(err))


    res.send({ status: 'OK' })
})

app.listen(4005, () => {
    console.log('listening on 4005')
})