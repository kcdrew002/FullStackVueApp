const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async(req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

// Add Posts
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createedAt: new Date()
    });
    res.status(201).send

});

// Delete Posts
router.delete('/:id', async(req, res)=>{
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id:new mongodb.ObjectId(req.params.id)});
    res.status(200).send();
});


// connects to Mongo Database
async function loadPostsCollection(){
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://kcdrew002:Ne7gxazz@cluster0.lnmqzui.mongodb.net/test', {
        useNewURLParser: true
    });

    return client.db('Cluster0').collection('posts');
}

module.exports = router;