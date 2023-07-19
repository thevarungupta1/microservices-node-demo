const express = require('express')
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors())

const commentsByPostId = {}

// get comment by post id
app.get('/posts/:postId/comments', (req, res) => {
    res.send(commentsByPostId[req.params.postId] || []);
})


// create comment by post id
app.post('/posts/:postId/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex')
    const { content } = req.body;

    const comments = commentsByPostId[req.params.postId] || [];

    comments.push({ id: commentId, content });
    commentsByPostId[req.params.postId] = comments;

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id
        }
    })
    res.status(201).send(comments);
})

app.post('/events', (req, res) => {
    console.log('received event', req.body.type)
    res.send({})
})


app.listen(4001, () => {
    console.log('listening on 4001')
})