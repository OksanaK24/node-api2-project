const express = require("express");
const posts = require("../data/db");
const CommentsRouter = require("./Comments");

const router = express.Router();

router.use("/:id/comments", CommentsRouter)

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


module.exports = router;