const upload = require("../../multer");
const Activity = require("../../models/activity_log");

const {
    uploadImage,
    uploadIDs,
    uploadIDsDummy
} = require("../../cloudinary");
const express = require('express')
const {translate} = require('bing-translate-api');
const router = express.Router()
const User = require('../../models/user')

// upload profile image

router.post(
    "/profile",
    upload,
    async (req, res) => {
        let f_response = [];

        const files = req.files;
        // console.log(req.body, files);

        try {
            const result = await uploadImage(files[0]);
            f_response.push(result.secure_url);
            const user = User.findByIdAndUpdate(req.user._id, {
                profile_url: f_response[0],
            })
            await Activity.create({
                activity_message: "User uploaded profile image",
                posted_by_id: req.user._id,
                category: 'user',
                for_id: req.user._id
            })
            res.send({message: "Profile image uploaded", url: f_response[0]})

        } catch (error) {
            console.error(error);
            res.status(500).send("profile image not uploaded," + error);
        }
    }
);

// upload card id image and verify the user

router.post(
    "/id",
    upload,
    async (req, res) => {
        let responses = [];
        let f_response = [];

        const files = req.files;
        // console.log(req.body, files);

        try {
            const result = await /*uploadIDs*//*todo:should use the real function*/uploadIDsDummy(files[0]);
            const user = await User.findByIdAndUpdate(req.user._id, {
                id_url: result.secure_url,
            })

            let data = result['info']['ocr']['adv_ocr']['data'][0]['textAnnotations'][0]["description"]
            let pure_result
            data = data.replace(/(\r\n|\n|\r)/gm, " ");
            await translate(data, null, 'en').then(res => {
                pure_result = res.translation.trim()
            }).catch(err => {
                console.error("translation error: " + err);
            });

            // todo: just here make comparison between user elements and the text you get from the OCR
            await Activity.create({
                activity_message: "User uploaded ID image",
                posted_by_id: req.user._id,
                category: 'user',
                for_id: req.user._id
            })

            res.json({
                url: result.secure_url,
                data,
                pure_result
            })

        } catch (error) {
            console.error(error);
            res.status(500).send("card id image not uploaded," + error);
        }
    }
);


module.exports = router
