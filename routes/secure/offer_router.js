const Offer = require('../../models/offer');

const express = require('express')
const router = express.Router()
const mongoose = require("mongoose");
const {MongoClient} = require('mongodb');
const {isValidObjectId, ObjectId} = require("mongoose");

router.get('/', async (req, res) => {
    try {
        const offers = await Offer.find();
        if (offers.length === 0) {
            res.status(400).json({message: "No offers yet"})
        }
        res.status(200).json(offers)
    } catch (e) {
        res.status(500).json({message: e.message})
    }
})
router.post('/apply/:job_post_id', async (req, res) => {
    try {
        const job_post_id = req.params.job_post_id;
        if (job_post_id.match(/^[0-9a-fA-F]{24}$/) && isValidObjectId(job_post_id)) {
            const offer = await Offer.findOne({applicant_id: req.user._id, job_post_id: job_post_id});
            if (offer) {
                res.status(200).json({message: "Already applied"})
            } else {
                const new_offer = new Offer({
                    price: req.body.price,
                    message: req.body.message,
                    applicant_id: req.user._id,
                    job_post_id: job_post_id,
                })
                await new_offer.save();
                res.status(201).json({
                    message: "offer applied",
                    offer: new_offer
                })
            }
        }
    } catch (e) {
        res.status(500).json({message: e.message})
    }
})
router.get('/:offer_id', async (req, res) => {
    try {
        const offer_id = req.params.offer_id;
        if (offer_id.match(/^[0-9a-fA-F]{24}$/) && isValidObjectId(offer_id)) {
            const offer = await Offer.findOne({_id: req.params.offer_id});
            if (offer.length === 0) {
                res.status(200).json({message: "No offers with this id"})
            }
            res.status(200).json(offer)
        } else {
            res.status(400).json({message: "Invalid offer id"})
        }

    } catch (e) {
        res.status(500).json({message: e.message})
    }
})
router.delete('/:offer_id', async (req, res) => {
    try {
        const offer_id = req.params.offer_id;
        if (offer_id.match(/^[0-9a-fA-F]{24}$/) && isValidObjectId(offer_id)) {
            const offer = await Offer.findOne({_id: req.params.offer_id});
            if (offer.length === 0) {
                res.status(200).json({message: "No offers with this id"})
            }
            await offer.remove();
            res.status(200).json("offer is deleted")
        } else {
            res.status(400).json({message: "Invalid offer id"})
        }

    } catch (e) {
        res.status(500).json({message: e.message})
    }
})


module.exports = router