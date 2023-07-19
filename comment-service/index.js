const express = require('express')
const { randomBytes } = require('crypto');

const app = express();
app.use(express.json());

const commentsByPostId = {}

// get comment by post id
app.get('/posts/:postId/comments', (req, res) => {    
    res.send(commentsByPostId[req.params.postId] || []);
})


// create comment by post id
app.post('/posts/:postId/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex')
    const { content } = req.body;

    const comments = commentsByPostId[req.params.postId] || [];

    comments.push({id: commentId, content});
    commentsByPostId[req.params.postId] = comments;
    res.status(201).send(comments);
})

app.listen(3001, () => {
    console.log('listening on 3001')
})