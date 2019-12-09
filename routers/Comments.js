const express = require("express");
const posts = require("../data/db");

const router = express.Router({ mergeParams:true });

router.get("/", (req, res) => {
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

router.post("/", (req, res) => {

    const body = {
        text: req.body.text,
        post_id: req.params.id,
    }

    if(body.post_id){
        if(body.text) {
            posts
                .insertComment(body)
                .then(comment => {
                    res.status(201).json(comment)
                })
                .catch(error => {
                    console.log(body.text);
                    console.log(body.post_id);
                    console.log(error);
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