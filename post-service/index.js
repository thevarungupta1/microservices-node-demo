const express = require('express')
const { randomBytes } = require('crypto')

const app = express();
app.use(express.json());

/***
 * {
 *   id: ''
 *   title: '',
 * 
 * }
 * 
 */
const posts = {};

// get posts
app.get('/posts', (req, res) => {
    res.send(posts)
})

// create a new post
app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id, title
    }

    res.status(201).send(posts[id])
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})