const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");


const users = require("./users.js");
const User = users.model;

const bandnameSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    name: String,
    count: Number,
    created: {
        type: Date,
        default: Date.now
    },
});

const Bandname = mongoose.model('Bandname', bandnameSchema);

// submit a name
router.post("/", auth.verifyToken, User.verify, async (req, res) => {
    console.log("received name " + req.body.name);
    const bandname = new Bandname({
        user: req.user,
        name: req.body.name,
        count: req.body.count,
    });
    try {
        await bandname.save();
        res.send(bandname);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


// get my bandnames
router.get("/", auth.verifyToken, User.verify, async (req, res) => {
    // return bandnames
    try {
        let bandnames = await Bandname.find({
            user: req.user
        }).sort({
            created: -1
        });
        return res.send(bandnames);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// get all bandnames
router.get("/all", async (req, res) => {
    try {
        let bandnames = await Bandname.find().sort({
            created: -1
        }).populate('user');
        return res.send(bandnames);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.delete("/:id", auth.verifyToken, User.verify, async (req, res) => {
    try {
        let checkname = await Bandname.findOne({
            _id: req.params.id
        });
        console.log("_id of name to delete: " + req.params.id);
        console.log("_id of user associated to name: " + checkname.user._id);
        console.log("_id of user deleteting the name: " + checkname.user._id);
        //If the band name doesnt correspond to the user 
        //calling the delete, send forbidden

        /*if (req.user._id != checkname.user._id) {
            res.sendStatus(403);
        }*/
        //else {
            await Bandname.deleteOne({
                _id: req.params.id
            });
            res.sendStatus(200);
        //}
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Add a vote to the name
router.put('/:id', async (req, res) => {
    try {
        console.log("PUT +/- vote name _id: " + req.params.id);
        let bandname = await Bandname.findOne({
            _id: req.params.id
        });
        if (req.body.vote == 'plus') {
            bandname.count += 1;
        }
        else {
            bandname.count -= 1;
        }
        bandname.save();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = {
    model: Bandname,
    routes: router,
}