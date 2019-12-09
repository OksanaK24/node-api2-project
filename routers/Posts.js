const express = require("express");
const posts = require("../data/db");

const router = express.Router({ mergeParams:true });

router.get("/", (req, res) => {
    posts
        .find()
        .then(post => {
            res.status(200).json(post)
        })
        .catch(() => {
            res.status(500).json({ errorMessage: "The posts information could not be retrieved." })
        })
})


router.post("/", (req, res) => {
    const { title, contents } = req.body;

    if (!title || !contents) {
      res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
      posts
        .insert(req.body)
        .then(post => {
          res.status(201).json(post);
        })
        .catch(() => {
          res.status(500).json({ errorMessage: "There was an error while saving the post to the database" })
        });
    }
})


router.get("/:id", (req, res) => {
    if(req.params.id){
        posts
            .findById(req.params.id)
            .then(post =>{
                res.status(200).json(post)
            })
            .catch(() => {
                res.status(500).json({ errorMessage: "The post information could not be retrieved." })
            })
    }else{
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
})


router.delete("/:id", (req, res) => {
    if(req.params.id){
        posts
            .remove(req.params.id)
            .then(post =>{
                res.status(200).json(post)
            })
            .catch(() => {
                res.status(500).json({ errorMessage: "The post could not be removed" })
            })
    }else{
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
})


router.put("/:id", (req, res) => {

    const { title, contents } = req.body;

    if(req.params.id){
        if(!title || !contents) {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        } else {
            posts
                .update(req.params.id, req.body)
                .then(post => {
                    res.status(200).json(post)
                })
                .catch(() => {
                    res.status(500).json({ errorMessage: "The post information could not be modified." })
                })
        }
    }else{
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
})


router.get("/:id/comments", (req, res) => {
    if(req.params.id){
        posts
            .findPostComments(req.params.id)
            .then(comment => {
                res.json(comment)
            })
            .catch(error =>{
                res.status(500).json({ message: "The comments information could not be retrieved." })
            })
    }else{
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
})



// When the client makes a POST request to /api/posts/:id/comments:

// If the post with the specified id is not found:

// return HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The post with the specified ID does not exist." }.
// If the request body is missing the text property:

// cancel the request.
// respond with HTTP status code 400 (Bad Request).
// return the following JSON response: { errorMessage: "Please provide text for the comment." }.
// If the information about the comment is valid:

// save the new comment the the database.
// return HTTP status code 201 (Created).
// return the newly created comment.
// If there's an error while saving the comment:

// cancel the request.
// respond with HTTP status code 500 (Server Error).
// return the following JSON object: { error: "There was an error while saving the comment to the database" }.

// insertComment()


router.post("/:id/comments", (req, res) => {


    if(req.params.id){
        if(req.body.text) {
            posts
                .insertComment(req.params.id, req.body.text)
                .then(comment => {
                    res.status(201).json(comment)
                })
                .catch(error => {
                    console.log(req.body.text);
                    res.status(500).json({ message: "There was an error while saving the comment to the database" })
                })
        }else{
            return res.status(400).json({ message: "Please provide text for the comment."})
        }
    }else{
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
})





module.exports = router;